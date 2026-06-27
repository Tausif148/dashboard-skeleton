import React from "react";

interface DateFormatProps {
    date: string | null | undefined;
    format?: "dd-mm-yyyy" | "dd/mm/yyyy";
}

const DateFormat: React.FC<DateFormatProps> = ({
    date,
    format = "dd-mm-yyyy",
}) => {
    if (!date) return <span>-</span>;

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    const formatted =
        format === "dd/mm/yyyy"
            ? `${day}/${month}/${year}`
            : `${day}-${month}-${year}`;

    return <span>{formatted}</span>;
};

export default DateFormat;