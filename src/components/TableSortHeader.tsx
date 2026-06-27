import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Box, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';

interface Props {
    columnKey: string;
    sortKey: string | null;
    sortDirection: 'asc' | 'desc';
    onSort: (key: string) => void;
    children: React.ReactNode;
}

function TableSortHeader({ columnKey, sortKey, sortDirection, onSort, children }: Props) {
    const active = sortKey === columnKey;
    const rotated = active && sortDirection === 'desc' ? 'rotate(180deg)' : 'none';

    return (
        <Box sx={{ cursor: 'pointer' }} onClick={() => onSort(columnKey)}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" sx={{ color: "#000", fontSize: "0.9rem" }}>{children}</Typography>
                <Box>
                    <UnfoldMoreIcon fontSize="small" sx={{ transform: rotated, color: active ? 'primary.main' : 'inherit', fontSize: "1.2rem", mt: 1 }} />
                </Box>
            </Stack>
        </Box>
    );
}

export default memo(TableSortHeader);
