import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { RowExportConfig } from './rowExport.types';

// ─────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────
function resolveValue<T extends Record<string, any>>(
  col: RowExportConfig<T>['columns'][number],
  row: T,
): string {
  const raw = row[col.key];
  if (col.format) return String(col.format(raw, row));
  if (raw === null || raw === undefined || raw === '') return '-';
  return String(raw);
}

// ─────────────────────────────────────────────────────────────
// PDF
// ─────────────────────────────────────────────────────────────
export function exportRowAsPdf<T extends Record<string, any>>({
  columns,
  row,
  fileName = 'Record',
  reportTitle = 'Record Details',
}: RowExportConfig<T>): void {
  const doc = new jsPDF({ orientation: 'portrait' });
  const margin = 14;

  // Green header bar
  doc.setFillColor(30, 138, 82);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(reportTitle, margin, 17);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, margin, 24);

  // Label / Value table
  autoTable(doc, {
    startY: 34,
    head: [['Field', 'Value']],
    body: columns.map((col) => [col.label, resolveValue(col, row)]),
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [30, 138, 82], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60, fillColor: [238, 241, 244] },
      1: { cellWidth: 'auto' },
    },
    margin: { left: margin, right: margin },
  });

  doc.save(`${fileName}.pdf`);
}

// ─────────────────────────────────────────────────────────────
// EXCEL
// ─────────────────────────────────────────────────────────────
export function exportRowAsExcel<T extends Record<string, any>>({
  columns,
  row,
  fileName = 'Record',
  sheetName = 'Record',
}: RowExportConfig<T>): void {
  const headers = columns.map((c) => c.label);
  const values = columns.map((c) => resolveValue(c, row));

  const ws = XLSX.utils.aoa_to_sheet([headers, values]);
  ws['!cols'] = headers.map((h) => ({ wch: Math.max(h.length + 4, 20) }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

// ─────────────────────────────────────────────────────────────
// PRINT
// ─────────────────────────────────────────────────────────────
export function printRow<T extends Record<string, any>>({
  columns,
  row,
  reportTitle = 'Record Details',
}: RowExportConfig<T>): void {

  // Remove old print container if exists
  document.getElementById('print-row-container')?.remove();
  document.getElementById('print-row-style')?.remove();

  const rows = columns
    .map(
      (col, index) => `
        <tr class="${index % 2 === 0 ? 'row-even' : 'row-odd'}">
          <td class="label">${col.label}</td>
          <td>${resolveValue(col, row) ?? '—'}</td>
        </tr>
      `,
    )
    .join('');

  // Create container
  const container = document.createElement('div');
  container.id = 'print-row-container';

  container.innerHTML = `
    <div class="print-wrapper">

      <div class="doc-header">
        <div>
          <div class="doc-title">${reportTitle}</div>
        </div>

        <div class="cert-badge">
          <div class="cert-label">Printed On</div>
          <div class="cert-id">
            ${new Date().toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div class="section-title">
        <span>Details Summary</span>
        <div class="section-line"></div>
      </div>

      <div class="table-wrapper">
        <table>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <div class="footer-note">
          Generated print preview document
        </div>
      </div>

    </div>
  `;

  // Create styles
  const style = document.createElement('style');
  style.id = 'print-row-style';

  style.innerHTML = `
    #print-row-container {
      display: none;
    }

    @media print {

      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
      }

      body * {
        visibility: hidden !important;
      }

      #print-row-container,
      #print-row-container * {
        visibility: visible !important;
      }

      #print-row-container {
        display: block !important;
        position: absolute;
        inset: 0;
        width: 100%;
        background: white;
        padding: 18px;
        box-sizing: border-box;
      }

      .print-wrapper {
        width: 100%;
        font-family: 'DM Sans', 'Segoe UI', sans-serif;
        color: #1a1a1a;
        font-size: 11px;
      }

      /* ───────────────────────── */
      /* HEADER */
      /* ───────────────────────── */

      .doc-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 2px solid #15803d;
        padding-bottom: 14px;
        margin-bottom: 20px;
      }

      .doc-title {
        font-size: 20px;
        font-weight: 700;
        color: #15803d;
        letter-spacing: 0.3px;
      }

      .cert-badge {
        text-align: right;
      }

      .cert-label {
        font-size: 10px;
        color: #888;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .cert-id {
        font-size: 13px;
        font-weight: 700;
        color: #15803d;
        margin-top: 4px;
      }

      /* ───────────────────────── */
      /* SECTION TITLE */
      /* ───────────────────────── */

      .section-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 13px;
        color: #15803d;
        margin-bottom: 10px;
        margin-top: 20px;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        break-after: avoid;
        page-break-after: avoid;
      }

      .section-line {
        flex: 1;
        height: 1px;
        background: #bbf7d0;
      }

      /* ───────────────────────── */
      /* TABLE */
      /* ───────────────────────── */

      .table-wrapper {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #EEF1F4;
        overflow: hidden;

        break-inside: avoid;
        page-break-inside: avoid;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }

      td {
        padding: 9px 12px;
        border-bottom: 1px solid #EEF1F4;
        font-size: 11px;
        vertical-align: top;
        word-break: break-word;
      }

      td.label {
        width: 35%;
        font-weight: 700;
        background: #f0fdf4 !important;
        color: #15803d;

        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .row-even {
        background: #ffffff !important;

        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .row-odd {
        background: #f9fafb !important;

        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* ───────────────────────── */
      /* FOOTER */
      /* ───────────────────────── */

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #EEF1F4;
        padding-top: 14px;
        margin-top: 20px;
      }

      .footer-note {
        font-size: 10px;
        color: #9ca3af;
      }

      /* ───────────────────────── */
      /* PAGE */
      /* ───────────────────────── */

      @page {
        size: auto;
        margin: 10mm;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(container);

  // Trigger direct print
  setTimeout(() => {
    window.print();
  }, 100);

  // Cleanup
  const cleanup = () => {
    container.remove();
    style.remove();

    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
}