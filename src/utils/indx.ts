import dayjs from "dayjs";

interface IDateFormatterOptions {
    dateOnly?: boolean;
    fancyFormat?: boolean;
    includeSeconds?: boolean;
    useCurrentDate?: boolean;
}

export const dateFormatter = (
    date?: string | Date,
    options?: IDateFormatterOptions,
): string | null => {
    const { dateOnly, fancyFormat, includeSeconds, useCurrentDate } =
        options || {};

    // If no date is provided, return current date if flag is enabled, otherwise return null
    if (!date && !useCurrentDate) return null;

    // Use current date if required
    const parsedDate = dayjs(date || new Date());

    // Validate date
    if (!parsedDate.isValid()) return null;

    // Determine the format (if no options are provided, return date-only by default)
    let format = "DD/MM/YYYY, hh:mm A"; // Default format

    if (fancyFormat) format = "DD MMM, YYYY";
    if (dateOnly) format = "DD/MM/YYYY";
    if (includeSeconds) format = "DD/MM/YYYY, hh:mm:ss A";
    if (!dateOnly && options) format = "DD/MM/YYYY, hh:mm A"; // If options are provided but no `dateOnly`, return full date-time

    return parsedDate.format(format);
};



export const calculateAge = (dob: string): string => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
};





export function toUTCISOFormat(dateTimeString: any) {
    const date = new Date(dateTimeString);
    return date.toISOString();
}
export function utcToLocalFormat(utcString: any) {
    const date = new Date(utcString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function isoToDateOnly(isoString: string) {
    return isoString.split("T")[0];
}
