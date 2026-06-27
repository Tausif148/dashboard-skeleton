// ─────────────────────────────────────────────────────────────
// Shared types — import these everywhere
// ─────────────────────────────────────────────────────────────

export interface ExportColumn<T = Record<string, any>> {
    label: string;
    key: keyof T & string;
    format?: (value: any, row: T) => string | number;
}

export interface RowExportConfig<T extends Record<string, any>> {
    columns: ExportColumn<T>[];
    row: T;
    fileName?: string;       // defaults to 'Record'
    reportTitle?: string;    // shown in PDF header + print
    sheetName?: string;      // Excel sheet name, defaults to 'Record'
}