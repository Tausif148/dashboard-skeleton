import { Stack, Typography } from "@mui/material";
import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { memo } from "react";

const { RangePicker } = DatePicker;

interface IDateRangeProps {
    format: string;
    separator: string;
    value: RangePickerProps["value"];
    label: string;
    onChange: RangePickerProps["onChange"];
    disabledDate?: RangePickerProps["disabledDate"];
}

function DateRangePicker(props: IDateRangeProps) {
    const { label, format, separator, value, onChange, disabledDate } = props;

    const predefinedPresets: RangePickerProps["presets"] = [
        { label: "Today", value: [dayjs(), dayjs()] },
        {
            label: "Yesterday",
            value: [dayjs().subtract(1, "day"), dayjs().subtract(1, "day")],
        },
        {
            label: "This Week",
            value: [dayjs().startOf("week"), dayjs().endOf("week")],
        },
        {
            label: "Last Week",
            value: [
                dayjs().subtract(1, "week").startOf("week"),
                dayjs().subtract(1, "week").endOf("week"),
            ],
        },
        {
            label: "This Month",
            value: [dayjs().startOf("month"), dayjs().endOf("month")],
        },
        {
            label: "Last Month",
            value: [
                dayjs().subtract(1, "month").startOf("month"),
                dayjs().subtract(1, "month").endOf("month"),
            ],
        },
    ];

    return (
        <Stack>
            <Typography sx={{ fontSize: "1rem", mb: 0.5, fontWeight: 500, color: "#555" }}>
                {label}
            </Typography>

            <RangePicker
                allowClear={true}
                format={format}
                presets={predefinedPresets}
                separator={separator}
                style={{
                    padding: "7px",
                    width: "300px",
                    height: "40px",
                    color: "#000",
                }}
                value={value}
                onChange={onChange}
                disabledDate={disabledDate}
            />
        </Stack>
    );
}

export default memo(DateRangePicker);