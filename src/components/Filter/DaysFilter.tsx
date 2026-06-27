import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { memo, useState } from "react";
import DateRangePicker from "./DateRangePicker";

export type RangeValue = [string, string] | null;
export interface IProps {
    title: string;
    onChange?: (value: RangeValue) => void;
}

function DaysFilter(props: IProps) {
    const { title, onChange } = props;
    const [dateRange, setDateRange] = useState<RangeValue>(null);

    const disableInvalidEndDate: RangePickerProps["disabledDate"] = (currentDate, info) => {
        if (!currentDate || !info?.from) {
            return false;
        }

        return currentDate.isBefore(info.from, "day");
    };

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        if (dates && dates[0] && dates[1]) {
            const fromPickerDate = dates[0];
            const toPickerDate = dates[1];
            const startDate = toPickerDate.isBefore(fromPickerDate, "day") ? toPickerDate : fromPickerDate;
            const endDate = toPickerDate.isBefore(fromPickerDate, "day") ? fromPickerDate : toPickerDate;

            const fromDate = startDate.format("YYYY-MM-DD");
            const toDate = endDate.format("YYYY-MM-DD");
            const nextRange: RangeValue = [fromDate, toDate];
            setDateRange(nextRange);
            onChange?.(nextRange);
            console.log("Selected Dates:", fromDate, "to", toDate);
        } else {
            setDateRange(null);
            onChange?.(null);
            console.log("Dates cleared");
        }
    };

    return (
        <div>
            <DateRangePicker
                format="DD/MM/YYYY"
                label={title}
                separator=" ~ "
                value={dateRange ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : null}
                onChange={handleDateChange}
                disabledDate={disableInvalidEndDate}
            />
        </div>
    );
}

export default memo(DaysFilter);