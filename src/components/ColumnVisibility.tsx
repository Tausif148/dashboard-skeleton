import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Box, Checkbox, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';

interface ColumnDef {
    key: string;
    label: string;
    always?: boolean;
}

interface Props {
    columns: ColumnDef[];
    visible: boolean[];
    onToggle: (index: number) => void;
    buttonLabel?: string;
}

export default function ColumnVisibility({ columns, visible, onToggle, }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) setAnchorEl(null);
        else setAnchorEl(e.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Tooltip title="Column Visibility" arrow>
                <Box
                    onClick={handleToggle}
                    sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ViewColumnIcon
                        sx={{
                            color: "#4f46e5",
                            fontSize: 28,
                        }}
                    />
                </Box>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {columns.map((col, idx) => (
                    <MenuItem
                        key={col.key}
                        onClick={() => {
                            if (!col.always) onToggle(idx);
                        }}
                        dense
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={Boolean(visible[idx])}
                                disabled={Boolean(col.always)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!col.always) onToggle(idx);
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText>{col.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
