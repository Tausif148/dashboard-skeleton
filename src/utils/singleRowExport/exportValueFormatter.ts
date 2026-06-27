// ─────────────────────────────────────────────────────────────
// UNIVERSAL EXPORT VALUE FORMATTER
// ─────────────────────────────────────────────────────────────

export const formatExportValue = (value: any): string => {
    // null / undefined
    if (
        value === null ||
        value === undefined ||
        value === '' ||
        value === 'null' ||
        value === 'undefined'
    ) {
        return '-';
    }

    // Array
    if (Array.isArray(value)) {
        if (value.length === 0) return '-';

        return value
            .map((item) => formatExportValue(item))
            .join(', ');
    }

    // Object
    if (typeof value === 'object') {
        return Object.entries(value)
            .map(([key, val]) => {
                return `${formatLabel(key)}: ${formatExportValue(val)}`;
            })
            .join(' | ');
    }

    // Boolean
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }

    return String(value);
};

// ─────────────────────────────────────────────────────────────
// LABEL FORMATTER
// ─────────────────────────────────────────────────────────────

export const formatLabel = (label: string): string =>
    label
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());