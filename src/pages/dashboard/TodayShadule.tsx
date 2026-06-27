import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Box, Chip, Paper, Typography } from '@mui/material';

const schedules = [
  {
    time: '09:00 AM',
    name: 'Rahul Sharma',
    type: 'Consultation',
    status: 'Completed',
    color: '#16A34A',
    bg: '#DCFCE7',
  },
  {
    time: '09:30 AM',
    name: 'Anita Verma',
    type: 'Follow-up',
    status: 'In Progress',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    time: '10:00 AM',
    name: 'Vikram Singh',
    type: 'New Patient',
    status: 'Pending',
    color: '#2563EB',
    bg: '#DBEAFE',
  },
  {
    time: '10:30 AM',
    name: 'Pooja Mehta',
    type: 'Consultation',
    status: 'Pending',
    color: '#2563EB',
    bg: '#DBEAFE',
  },
  {
    time: '11:00 AM',
    name: 'Ramesh Kumar',
    type: 'Follow-up',
    status: 'Pending',
    color: '#2563EB',
    bg: '#DBEAFE',
  },
];

export const TodayShadule = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        p: 2,
        height: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#111827',
          mb: 2,
        }}
      >
        Today's Schedule
      </Typography>

      {/* Schedule List */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {schedules.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr auto',
              alignItems: 'center',
              gap: 1,
              py: 0.3,
              transition: 'all 0.2s ease',

              '&:hover': {
                transform: 'translateX(3px)',
              },
            }}
          >
            {/* Time */}
            <Typography
              sx={{
                fontSize: '11px',
                fontWeight: 500,
                color: '#374151',
              }}
            >
              {item.time}
            </Typography>

            {/* User Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                minWidth: 0,
              }}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  fontSize: '12px',
                  fontWeight: 600,
                  bgcolor: '#DBEAFE',
                  color: '#2563EB',
                }}
              >
                {item.name.charAt(0)}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '11px',
                    color: '#6B7280',
                  }}
                >
                  {item.type}
                </Typography>
              </Box>
            </Box>

            {/* Status */}
            <Chip
              label={item.status}
              size="small"
              sx={{
                height: 22,
                fontSize: '10px',
                fontWeight: 600,
                color: item.color,
                bgcolor: item.bg,
                borderRadius: '6px',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Footer Link */}
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          width: 'fit-content',
          color: '#4f46e5',
          transition: 'all .2s ease',

          '&:hover': {
            color: '#4338CA',
            transform: 'translateX(2px)',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          View full schedule
        </Typography>

        <ArrowForwardIosIcon
          sx={{
            fontSize: 10,
            ml: 0.5,
          }}
        />
      </Box>
    </Paper>
  );
};