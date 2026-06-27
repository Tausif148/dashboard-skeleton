// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Avatar, Box, Button, Divider, IconButton, Menu, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthActions } from 'src/apiActions/useAuthActions';
import useDecoded from 'src/hooks/useDecoded';
// import * as dropdownData from './data';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { useFetchCompanyById } from 'src/queries/useFetchCompanyById';
// import unlimitedImg from 'src/assets/images/backgrounds/unlimited-bg.png';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const navigate = useNavigate();
  const { tryLogout } = useAuthActions();
  const { userId, company_id } = useDecoded();
  const { data: company, isError } = useFetchCompanyById({ company_id: company_id });
  // Hospitalmay be wrapped in the response object from useListQuery
  const companyData =
    company?.data?.data && Array.isArray(company.data.data)
      ? company.data.data[0]
      : company?.data?.data || company?.data || null;
  const handleLogout = async () => {
    await tryLogout();
    navigate('/login');
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
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
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
            p: 4,
          },
        }}
      >
        <Typography variant="h5">Hospital Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={
              companyData?.company_logo?.image_url ||
              companyData?.profile_image?.image_url ||
              ProfileImg
            }
            alt={companyData?.company_name || 'Company'}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
              {companyData?.company_name || companyData?.owner_name || 'Company'}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2" sx={{ mt: 0.5 }}>
              {companyData?.email || companyData?.mobile_number || 'Hospital contact'}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        {/* {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link to={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))} */}
        <Box mt={2}>
          {/* <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" mb={2}>
                  Unlimited <br />
                  Access
                </Typography>
                <Button variant="contained" color="primary">
                  Upgrade
                </Button>
              </Box>
              <img src={unlimitedImg} alt="unlimited" className="signup-bg"></img>
            </Box>
          </Box> */}
          {/* <Button to="/home" variant="outlined" color="primary" component={Link} fullWidth>
            Logout
          </Button> */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            sx={{
              color: '#fff',
              fontWeight: 600,
              px: 2,
              height: '40px',
              textTransform: 'none',
              borderRadius: '5px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              backgroundColor: '#4f46e5',
              border: '2px solid #4f46e5',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#4f46e5',
                border: '2px solid #4f46e5',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
