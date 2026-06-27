import jsPDF from "jspdf";
import autoTable, { Styles } from "jspdf-autotable";
import * as XLSX from "xlsx";

// ─── Public types ─────────────────────────────────────────────────────────────

/**
 * One column definition shared by both Excel and PDF export.
 * @template T  Shape of a single data-row object.
 */
export interface ExportColumn<T = Record<string, unknown>> {
    /** Human-readable header label shown in the exported file */
    label: string;

    /**
     * How to read this column's value from a row:
     *   • A direct key of T                          "company_name"
     *   • A dot-path string for nested access         "plan.plan_name"
     *   • A function receiving (row, rowIndex)        (_r, i) => i + 1
     */
    key: keyof T | string | ((row: T, rowIndex: number) => unknown);

    /**
     * Relative width weight for proportional PDF layout.
     * Higher = wider column.  Defaults to 2.
     * Excel column width (characters) is also derived from this.
     */
    widthWeight?: number;

    /** Text alignment inside PDF cells.  Defaults to "left". */
    pdfAlign?: "left" | "center" | "right";

    /**
     * Optional value transformer applied before writing to both Excel and PDF.
     * Receives the raw resolved value and the full row object.
     */
    format?: (value: unknown, row: T) => string | number;
}

export interface ExportOptions<T = Record<string, unknown>> {
    /** Column definitions — order determines output order */
    columns: ExportColumn<T>[];
    /** Raw data rows */
    data: T[];
    /** Base file name without extension.  Defaults to "export" */
    fileName?: string;
    /** First heading row in the exported file */
    reportTitle?: string;
    /** Second heading row.  Auto-populated with today's date when omitted. */
    reportSubtitle?: string;

    excel?: {
        /** Sheet tab name.  Defaults to "Sheet1" */
        sheetName?: string;
        /** Header fill colour (hex without #).  Defaults to "2E86C1" */
        headerColor?: string;
        /** Even data-row fill colour (hex without #).  Defaults to "EBF5FB" */
        evenRowColor?: string;
    };

    pdf?: {
        /** Defaults to "landscape" */
        orientation?: "portrait" | "landscape";
        /** jsPDF page format.  Defaults to "a4" */
        format?: string | number[];
        /** Left & right page margin in mm.  Defaults to 10 */
        margin?: number;
        /** Body font size in pt.  Defaults to 6.5 */
        fontSize?: number;
        /** Header fill as [R, G, B].  Defaults to [46, 134, 193] */
        headerColor?: [number, number, number];
        /** Even data-row fill as [R, G, B].  Defaults to [235, 245, 251] */
        evenRowColor?: [number, number, number];
        /** Minimum column width in mm.  Defaults to 7 */
        minColWidth?: number;
    };

    print?: {
        title?: string;
        subtitle?: string;
    };
}

// ─── Private helpers ──────────────────────────────────────────────────────────

/** Read a dot-path from an object safely — "plan.plan_name" */
const getByPath = (obj: unknown, path: string): unknown =>
    path.split(".").reduce<unknown>(
        (acc, key) =>
            acc !== null && typeof acc === "object"
                ? (acc as Record<string, unknown>)[key]
                : undefined,
        obj
    );

/** Resolve raw cell value from a column definition + row + row index */
const resolveValue = <T,>(
    col: ExportColumn<T>,
    row: T,
    idx: number
): unknown => {
    if (typeof col.key === "function") return col.key(row, idx);
    const k = col.key as string;
    return k.includes(".") ? getByPath(row, k) : (row as Record<string, unknown>)[k];
};

/** Resolve + format a cell, returning a clean string or number */
const getCellValue = <T,>(
    col: ExportColumn<T>,
    row: T,
    idx: number
): string | number => {
    const raw = resolveValue(col, row, idx);
    if (col.format) return col.format(raw, row);
    if (raw === null || raw === undefined) return "—";
    if (typeof raw === "string") return raw.replace(/\s+/g, " ").trim() || "—";
    return raw as number;
};

/**
 * Distribute `availableWidth` mm proportionally by widthWeight.
 *
 * Guarantees
 *   • No column narrower than `minWidth` mm
 *   • Σ widths === availableWidth  (floating-point corrected)
 */
const computePdfWidths = (
    columns: ExportColumn<unknown>[],
    availableWidth: number,
    minWidth: number
): number[] => {
    const weights = columns.map((c) => Math.max(0.5, c.widthWeight ?? 2));
    const totalWeight = weights.reduce((s, w) => s + w, 0);

    // Proportional allocation
    const widths = weights.map((w) =>
        parseFloat(((w / totalWeight) * availableWidth).toFixed(2))
    );

    // Enforce minWidth — track deficit
    let deficit = 0;
    widths.forEach((w, i) => {
        if (w < minWidth) {
            deficit += minWidth - w;
            widths[i] = minWidth;
        }
    });

    // Claw back deficit from widest columns first
    if (deficit > 0.01) {
        const bySize = widths
            .map((w, i) => ({ i, w }))
            .filter((x) => x.w > minWidth)
            .sort((a, b) => b.w - a.w);

        for (const { i } of bySize) {
            if (deficit <= 0.01) break;
            const cut = Math.min(deficit, widths[i] - minWidth);
            widths[i] = parseFloat((widths[i] - cut).toFixed(2));
            deficit -= cut;
        }
    }

    // Correct floating-point drift
    const drift = parseFloat(
        (availableWidth - widths.reduce((s, w) => s + w, 0)).toFixed(2)
    );
    if (Math.abs(drift) > 0.005) {
        const maxIdx = widths.indexOf(Math.max(...widths));
        widths[maxIdx] = parseFloat((widths[maxIdx] + drift).toFixed(2));
    }

    return widths;
};

// ─── Excel export ─────────────────────────────────────────────────────────────
const runExcelExport = <T,>(opts: ExportOptions<T>): void => {
    const {
        columns,
        data,
        fileName = "export",
        reportTitle = "",
        reportSubtitle = "",
        excel: {
            sheetName = "Sheet1",
            headerColor = "2E86C1",
            evenRowColor = "EBF5FB",
        } = {},
    } = opts;

    const today = new Date().toLocaleDateString("en-IN");
    const ws = XLSX.utils.json_to_sheet([]);

    // Leading rows: title + subtitle + blank separator
    const aoa: (string | number)[][] = [];
    if (reportTitle) aoa.push([reportTitle]);
    aoa.push([reportSubtitle || (reportTitle ? `Date: ${today}` : today)]);
    aoa.push([]); // blank row before headers

    XLSX.utils.sheet_add_aoa(ws, aoa, { origin: "A1" });

    // Data (one object per row, keyed by column label)
    const rows = data.map((row, idx) => {
        const obj: Record<string, string | number> = {};
        columns.forEach((col) => { obj[col.label] = getCellValue(col, row, idx); });
        return obj;
    });

    const dataStartRow = aoa.length; // 0-based index where json header lands
    XLSX.utils.sheet_add_json(ws, rows, {
        origin: { r: dataStartRow, c: 0 },
        skipHeader: false,
    });

    const lastColIdx = columns.length - 1;

    // Merge title/subtitle rows across all columns
    ws["!merges"] = aoa
        .map((row, r): XLSX.Range | null =>
            row.length > 0 ? { s: { r, c: 0 }, e: { r, c: lastColIdx } } : null
        )
        .filter((x): x is XLSX.Range => x !== null);

    // Column widths derived from widthWeight
    const totalWeight = columns.reduce((s, c) => s + (c.widthWeight ?? 2), 0);
    ws["!cols"] = columns.map((col) => ({
        wch: Math.max(8, Math.round(((col.widthWeight ?? 2) / totalWeight) * columns.length * 12)),
    }));

    // Header row styling
    const range = XLSX.utils.decode_range(ws["!ref"] ?? "A1");
    for (let c = 0; c <= lastColIdx; c++) {
        const addr = XLSX.utils.encode_cell({ r: dataStartRow, c });
        if (ws[addr]) {
            ws[addr].s = {
                font: { bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: headerColor } },
                alignment: { horizontal: "center", vertical: "center", wrapText: true },
                border: {
                    top: { style: "thin", color: { rgb: "CCCCCC" } },
                    bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                    left: { style: "thin", color: { rgb: "CCCCCC" } },
                    right: { style: "thin", color: { rgb: "CCCCCC" } },
                },
            };
        }
    }

    // Alternating data-row styling
    for (let r = dataStartRow + 1; r <= range.e.r; r++) {
        const isEven = (r - dataStartRow - 1) % 2 === 0;
        for (let c = 0; c <= lastColIdx; c++) {
            const addr = XLSX.utils.encode_cell({ r, c });
            if (ws[addr]) {
                ws[addr].s = {
                    fill: { fgColor: { rgb: isEven ? evenRowColor : "FFFFFF" } },
                    alignment: { vertical: "center" },
                };
            }
        }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};

// ─── PDF export ───────────────────────────────────────────────────────────────

const runPdfExport = <T,>(opts: ExportOptions<T>): void => {
    const {
        columns,
        data,
        fileName = "export",
        reportTitle = "",
        reportSubtitle = "",
        pdf: {
            orientation = "landscape",
            format = "a4",
            margin = 10,
            fontSize = 6.5,
            headerColor = [30, 138, 82] as [number, number, number],
            evenRowColor = [235, 245, 251] as [number, number, number],
            minColWidth = 7,
        } = {},
    } = opts;

    const doc = new jsPDF({ orientation, unit: "mm", format });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const usableWidth = pageW - margin * 2; // landscape A4 → 297 - 20 = 277 mm

    // ── Title block ─────────────────────────────────────────────────────────────
    let cursorY = margin;

    if (reportTitle) {
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text(reportTitle, pageW / 2, cursorY + 4);
        cursorY += 9;
    }

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
        reportSubtitle || `Date: ${new Date().toLocaleDateString("en-IN")}`,
        pageW / 2,
        cursorY + 2,
    );
    cursorY += 8;

    // ── Proportional column widths ───────────────────────────────────────────────
    // Sum === usableWidth; no column < minColWidth → nothing ever gets cut off.
    const colWidths = computePdfWidths(
        columns as ExportColumn<unknown>[],
        usableWidth,
        minColWidth
    );

    // ── Table data ───────────────────────────────────────────────────────────────
    const head = [columns.map((c) => c.label)];
    const body = data.map((row, idx) =>
        columns.map((col) => String(getCellValue(col, row, idx)))
    );

    // ── Per-column styles (width + alignment) ────────────────────────────────────
    const columnStyles: Record<number, Partial<Styles>> = {};
    columns.forEach((col, i) => {
        columnStyles[i] = {
            cellWidth: colWidths[i],   // exact mm — guarantees full-width coverage
            halign: col.pdfAlign ?? "left",
        };
    });

    // ── autoTable ────────────────────────────────────────────────────────────────
    autoTable(doc, {
        head,
        body,
        startY: cursorY,
        tableWidth: usableWidth,   // hard-constrain to page usable area
        margin: { left: margin, right: margin, top: margin, bottom: margin + 6 },
        styles: {
            fontSize,
            cellPadding: { top: 1.8, bottom: 1.8, left: 1.5, right: 1.5 },
            overflow: "linebreak",   // wrap long text instead of clipping
            valign: "middle",
            lineColor: [220, 220, 220],
            lineWidth: 0.1,
        },
        headStyles: {
            fillColor: headerColor,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            valign: "middle",
            fontSize,
        },
        alternateRowStyles: { fillColor: evenRowColor },
        columnStyles,
        didDrawPage: ({ pageNumber }) => {
            const total = (doc as any).internal.getNumberOfPages();
            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(130);
            doc.text(`Page ${pageNumber} of ${total}`, pageW / 2, pageH - 4, {
                align: "center",
            });
            doc.setTextColor(0);
        },
    });

    doc.save(`${fileName}.pdf`);
};



// ─── Print export ───────────────────────────────────────────────────────────────

const runPrintExport = <T,>(opts: ExportOptions<T>): void => {
    const {
        columns,
        data,
        reportTitle = "Report",
        reportSubtitle,
    } = opts;

    const today = new Date().toLocaleDateString("en-IN");

    // Remove old container if exists
    document.getElementById("print-container")?.remove();
    document.getElementById("print-style")?.remove();

    // Create container
    const printContainer = document.createElement("div");
    printContainer.id = "print-container";

    const headers = columns
        .map((col) => `<th>${col.label}</th>`)
        .join("");

    const rows = data
        .map(
            (row, rowIndex) => `
        <tr>
          ${columns
                    .map(
                        (col) => `
                <td>
                  ${getCellValue(col, row, rowIndex)}
                </td>
              `
                    )
                    .join("")}
        </tr>
      `
        )
        .join("");

    printContainer.innerHTML = `
    <div class="print-wrapper">
      <div class="print-header">
        <h2>${reportTitle}</h2>
        <p>${reportSubtitle || `Generated on ${today}`}</p>
      </div>

      <table>
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;

    // Create print styles
    const style = document.createElement("style");
    style.id = "print-style";

    style.innerHTML = `
    #print-container {
      display: none;
    }

    @media print {

      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        height: auto !important;
        overflow: hidden !important;
        background: white !important;
      }

      body * {
        visibility: hidden !important;
      }

      #print-container,
      #print-container * {
        visibility: visible !important;
      }

      #print-container {
        display: block !important;
        position: fixed;
        inset: 0;
        width: 100%;
        background: white;
        padding: 12px;
      }

      .print-wrapper {
        width: 100%;
        font-family: Arial, sans-serif;
      }

      .print-header {
        text-align: center;
        margin-bottom: 10px;
      }

      .print-header h2 {
        margin: 0;
        font-size: 18px;
      }

      .print-header p {
        margin-top: 4px;
        font-size: 11px;
        color: #666;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: auto;
      }

      th,
      td {
        border: 1px solid #dcdcdc;
        padding: 6px;
        font-size: 10px;
        text-align: left;
        word-break: break-word;
      }

      th {
        background-color: #4f46e5 !important;
        color: white !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      tr:nth-child(even) {
        background-color: #f5f5f5 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      thead {
        display: table-header-group;
      }

      tr,
      td,
      th {
        page-break-inside: avoid !important;
      }

      @page {
        size: auto;
        margin: 8mm;
      }
    }
  `;

    document.head.appendChild(style);
    document.body.appendChild(printContainer);

    // Trigger print
    setTimeout(() => {
        window.print();
    }, 100);

    // Cleanup
    const cleanup = () => {
        printContainer.remove();
        style.remove();
        window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
};


// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useExport()
 *
 * Returns two stable export functions.  Both accept the same ExportOptions.
 *
 * @example
 * const { exportExcel, exportPdf } = useExport();
 *
 * exportExcel({
 *   columns: COMPANY_COLUMNS,
 *   data: companies,
 *   fileName: "Company_Report",
 *   reportTitle: "Path Sanstha Sahakari Co-operative Company",
 *   excel: { sheetName: "Companies" },
 * });
 *
 * exportPdf({
 *   columns: COMPANY_COLUMNS,
 *   data: companies,
 *   fileName: "Company_Report",
 *   reportTitle: "Path Sanstha Sahakari Co-operative Company",
 * });
 */
const useExport = () =>
({
    exportExcel: runExcelExport,
    exportPdf: runPdfExport,
    printData: runPrintExport,
} as const);

export default useExport;