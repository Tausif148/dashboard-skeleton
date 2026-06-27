import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { type ElementType } from 'react';

interface QuickActionProps {
  icon: ElementType<SvgIconProps>;
  title: string;
  value: string;
  subtitle: string;
  icon2: string;
}

export const QuickAction = ({
  icon: Icon,
  title,
  value,
  subtitle,
  icon2,
}: QuickActionProps) => {
  const iconColor = '#5B4BFF';

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 78,
        px: 2,
        py: 1.5,
        borderRadius: "12px",
        border: "1px solid #E9EAF3",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FAFBFF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        transition:
          "all 0.25s cubic-bezier(0.4,0,0.2,1)",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 8px 24px rgba(91,75,255,0.12)",
          borderColor: "#DADCF8",
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #F6F7FF 100%)",
        },
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          minWidth: 0,
          gap: 1.5,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            backgroundColor: "#EEF0FF",
            border: "1px solid #D9DEFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon
            sx={{
              fontSize: 18,
              color: iconColor,
            }}
          />
        </Box>

        {/* Text */}
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#1F2937",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: "11px",
              color: "#6B7280",
              lineHeight: 1.4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {subtitle || value || icon2}
          </Typography>
        </Box>
      </Box>

      {/* Action */}
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: "8px",
          backgroundColor: "#F4F5FB",
          border: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7C3AED",
          transition: "all 0.2s ease",
          flexShrink: 0,

          ".MuiPaper-root:hover &": {
            backgroundColor: "#5B4BFF",
            color: "#FFFFFF",
          },
        }}
      >
        <ArrowForwardIosIcon
          sx={{
            fontSize: 11,
          }}
        />
      </Box>
    </Paper>
  );
};