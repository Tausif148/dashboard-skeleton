import { exportRowAsExcel, exportRowAsPdf, printRow } from './rowExport.utils';
import { ExportColumn } from './rowExport.types';

interface UseRowExportOptions<T extends Record<string, any>> {
    row: T | null;
    columns: ExportColumn<T>[];
    fileName?: string;
    reportTitle?: string;
    sheetName?: string;
}

// ─────────────────────────────────────────────────────────────
// One hook. Any page. Any row shape.
// Usage:
//   const { handleDownloadPDF, handleDownloadExcel, handlePrint }
//     = useRowExport({ row: selectedRow, columns: MY_COLUMNS, fileName: 'DO_123' })
// ─────────────────────────────────────────────────────────────

export function useRowExport<T extends Record<string, any>>({
    row,
    columns,
    fileName = 'Record',
    reportTitle = 'Record Details',
    sheetName = 'Record',
}: UseRowExportOptions<T>) {
    const config = row ? { row, columns, fileName, reportTitle, sheetName } : null;

    const handleDownloadPDF = async (): Promise<void> => {
        if (config) exportRowAsPdf(config);
    };

    const handleDownloadExcel = async (): Promise<void> => {
        if (config) exportRowAsExcel(config);
    };

    const handlePrint = async (): Promise<void> => {
        if (config) printRow(config);
    };

    return { handleDownloadPDF, handleDownloadExcel, handlePrint };
}