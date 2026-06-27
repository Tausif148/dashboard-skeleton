import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Paper, Typography } from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { ElementType } from 'react';

interface DashboardCardItem {
  label: string;
  value: string | number;
}

interface DashboardCardProps {
  icon: ElementType<SvgIconProps>;
  title: string;
  iconColor: string;
  data: DashboardCardItem[];
}

export const DashboardCard = ({
  icon: Icon,
  title,
  iconColor,
  data,
}: DashboardCardProps) => {
  const value = data?.[0]?.value ?? 0;

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #E8EDF3',
        borderRadius: '12px',
        backgroundColor: `${iconColor}08`,
        px: 2.2,
        py: 1.8,
        minHeight: '110px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: `0 8px 20px ${iconColor}25`,
          borderColor: `${iconColor}40`,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        {/* Icon + Title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Icon
            sx={{
              fontSize: 18,
              color: iconColor,
              flexShrink: 0,
            }}
          />

          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        {/* Value */}
        <Typography
          sx={{
            fontSize: '30px',
            fontWeight: 700,
            color: '#111827',
            lineHeight: 1,
            mt: 1,
          }}
        >
          {value}
        </Typography>

        {/* View All */}
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            gap: 0.4,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'opacity 0.2s ease',

            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          View all
          <ArrowForwardIosIcon
            sx={{
              fontSize: 10,
            }}
          />
        </Typography>

      </Box>
    </Paper>
  );
};