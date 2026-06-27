import { CircularProgress, Button as MUIButton, SxProps, Theme, useTheme } from '@mui/material';
import { ResponsiveStyleValue } from "@mui/system";
import { ReactNode } from 'react';

interface IProps {
    label: string;
    onClick?: () => void;
    py?: ResponsiveStyleValue<number | string>;
    px?: ResponsiveStyleValue<number | string>;
    fontSize?: ResponsiveStyleValue<number | string>;
    fontWeight?: string
    fontFamily?: string
    borderRadius?: string
    height?: ResponsiveStyleValue<number | string>;
    width?: ResponsiveStyleValue<number | string>;
    startIcon?: ReactNode;
    bgcolor?: string;
    color?: string;
    borderColor?: string;
    hoverColor?: string;
    invert?: boolean
    sx?: SxProps<Theme>;
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    disabled?: boolean;
}
function GoldButton(props: IProps) {
    const { label, py = 0.5, px = 2, fontSize = '1.25rem', size, fontFamily = "Figtree", borderRadius = "4px", height, width, fontWeight = 500, startIcon, bgcolor, color, invert = false, borderColor, hoverColor, sx, loading = false, disabled = false } = props
    const muiTheme = useTheme();
    return (
        <MUIButton
            variant="contained"
            size={size}
            startIcon={startIcon}
            onClick={props.onClick}
            disabled={disabled || loading}
            sx={(theme) => ({
                backgroundColor: invert ? theme.palette.custom.offWhite : bgcolor || theme.palette.custom.gold,
                color: invert ? theme.palette.custom.gold : color || theme.palette.custom.offWhite,
                border: (theme) => `1px solid ${borderColor || theme.palette.custom.gold}`,
                boxShadow: '0',
                px,
                py,
                borderRadius,
                textTransform: "none",
                fontFamily,
                fontWeight,
                fontSize,
                height,
                width,
                "& .MuiButton-startIcon": {
                    marginRight: "8px",
                },
                "&:hover": {
                    px: props.px ?? 2,
                    py,
                    boxShadow: '0',
                    fontSize,
                    fontWeight,
                    border: (theme) => `1px solid ${borderColor || theme.palette.custom.gold}`,
                    backgroundColor: (theme) => invert ? theme.palette.custom.gold : theme.palette.custom.offWhite,
                    color: invert ? theme.palette.custom.offWhite : hoverColor || theme.palette.custom.gold,
                },
                ...((typeof sx === 'function' ? sx(theme) : sx) as object),
            })}
        >
            {loading ? (
                <CircularProgress size={20} sx={{ color: invert ? muiTheme.palette.custom?.offWhite : muiTheme.palette.custom?.gold }} />
            ) : (
                label
            )}
        </MUIButton>
    )
}

export default GoldButton