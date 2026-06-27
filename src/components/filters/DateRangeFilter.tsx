import { Button, CardContent, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { IconFilter, IconFilterOff } from '@tabler/icons-react';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangeFilterProps {
    fromDate: Date | null;
    toDate: Date | null;
    onFromDateChange: (date: Date | null) => void;
    onToDateChange: (date: Date | null) => void;
    onApplyFilter: () => void;
    onResetFilter: () => void;
}

export default function DateRangeFilter({
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
    onApplyFilter,
    onResetFilter,
}: DateRangeFilterProps) {

    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'datepicker-outside-month-fix';
        style.innerHTML = `
            .react-datepicker__day--outside-month {
                visibility: hidden !important;
                pointer-events: none !important;
            }
        `;
        if (!document.getElementById('datepicker-outside-month-fix')) {
            document.head.appendChild(style);
        }
        return () => {
            const el = document.getElementById('datepicker-outside-month-fix');
            if (el) document.head.removeChild(el);
        };
    }, []);

    return (
        <CardContent sx={{
            p: 0,
            m: 0,
            '&:last-child': {
                pb: 0,
            },
        }}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="nowrap"
                sx={{
                    p: 0,
                    m: 0,
                }}
            >
                <DatePicker
                    selected={fromDate}
                    onChange={onFromDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="From Date"
                    customInput={
                        <TextField
                            size="small"
                            sx={{ width: 200, padding: '0' }}
                            inputProps={{ autoComplete: 'off' }}
                        />
                    }
                />

                <DatePicker
                    selected={toDate}
                    onChange={onToDateChange}
                    minDate={fromDate ?? undefined}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="To Date"

                    customInput={
                        <TextField
                            size="small"
                            sx={{ width: 200, padding: '0' }}
                            inputProps={{ autoComplete: 'off' }}
                        />
                    }
                />

                <Button
                    variant="contained"
                    startIcon={<IconFilter size={16} />}
                    onClick={onApplyFilter}
                    sx={{
                        bgcolor: '#4f46e5',
                        height: '36px',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8rem',
                        '&:hover': { bgcolor: '#166e42' },
                    }}
                >
                    Apply
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<IconFilterOff size={16} />}
                    onClick={onResetFilter}
                    sx={{
                        borderColor: '#4f46e5',
                        color: '#4f46e5',
                        height: '36px',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8rem',
                        '&:hover': {
                            borderColor: '#166e42',
                            color: '#166e42',
                            bgcolor: 'transparent',
                        },
                    }}
                >
                    Reset
                </Button>
            </Stack>
        </CardContent>
    );
}