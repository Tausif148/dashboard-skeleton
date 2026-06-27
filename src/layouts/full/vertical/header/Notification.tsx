// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import * as dropdownData from './data';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IconBellRinging } from '@tabler/icons-react';
import { Link } from 'react-router';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const theme = useTheme();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? 'primary.main' : 'text.secondary',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }}
        onClick={handleClick2}
      >
        <Badge
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.main, // required for dot
            },
          }}
        >
          <IconBellRinging size="21" stroke="1.5" color={theme.palette.primary.main} />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Notifications</Typography>
          <Chip label="5 new" color="primary" size="small" />
        </Stack>
        <Scrollbar sx={{ height: '385px' }}>
          {dropdownData.notifications.map((notification, index) => (
            <Box key={index}>
              <MenuItem sx={{ py: 2, px: 4 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    src={notification.avatar}
                    alt={notification.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {notification.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button to="/" variant="outlined" component={Link} color="primary" fullWidth>
            See all Notifications
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;
