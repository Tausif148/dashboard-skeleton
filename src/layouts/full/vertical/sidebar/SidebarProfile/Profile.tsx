import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IconLogout } from '@tabler/icons-react';

import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAuthActions } from '../../../../../apiActions/useAuthActions';
import { CustomizerContext } from '../../../../../context/CustomizerContext';

export const Profile = () => {
  const { isSidebarHover, isCollapse } = useContext(CustomizerContext);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? isCollapse == 'mini-sidebar' && !isSidebarHover : '';

  const navigate = useNavigate();
  const { tryLogout } = useAuthActions();

  const handleLogout = async () => {
    await tryLogout();
    navigate('/login');
  };

  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }, []);

  // console.log('Current User:', currentUser);

  const userName =
    currentUser?.user_name ||
    currentUser?.data?.user_name ||
    currentUser?.company?.user_name ||
    currentUser?.employee_name ||
    'Admin';
  const userRole = currentUser?.role || currentUser?.data?.role || 'Super Admin';

  const userAvatar =
    currentUser?.profile_image ||
    currentUser?.company?.profile_image ||
    currentUser?.data?.profile_image ||
    'Admin';

  return (
    <Box sx={{ mt: 'auto' }}>
      <Divider sx={{ borderColor: '#E5E7EB' }} />
      <Box
        display={'flex'}
        alignItems="center"
        gap={1.5}
        sx={{
          py: 2,
          px: 2.5,
        }}
      >
        <Avatar src={userAvatar} alt={userName} sx={{ width: 32, height: 32 }} />
        {!hideMenu && (
          <>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: '#111827',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {userName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#6B7280',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {userRole}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Tooltip title="Logout" placement="top">
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: '#6B7280',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#F3F4F6',
                    },
                  }}
                  size="small"
                >
                  <IconLogout size="20" />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
