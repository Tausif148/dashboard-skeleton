export function hexToRgb(hex = "#000000") {
    try {
        const clean = hex.replace("#", "").trim();
        if (clean.length !== 6) return "0,0,0";
        const r = parseInt(clean.substring(0, 2), 16);
        const g = parseInt(clean.substring(2, 4), 16);
        const b = parseInt(clean.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    } catch {
        return "0,0,0";
    }
}