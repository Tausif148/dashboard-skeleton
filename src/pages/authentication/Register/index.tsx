// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Box, Button, Grid, Stack, Typography, } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
// import img1 from 'src/assets/auth-bg.png';
// import Logo from 'src/layouts/full/shared/logo/Logo';
// import AuthLogin from './components/AuthLogin';
// import { useTranslation } from 'react-i18next';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import LoginLeftGrid from '../login/LoginLeftGrid';

const Register = () => {
  // const {t} = useTranslation();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };
  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
        <LoginLeftGrid />
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          size={{
            xs: 12,
            sm: 12,
            lg: 5,
            xl: 4
          }}>
          <Box p={4}>
            <Typography variant="h3" mb={1}
              sx={{
                // fontFamily: 'Marcellus',
                fontWeight: 500,
                fontSize: '26px'
              }}>
              Register Your Banking Admin Account
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Sign up to access your banking admin dashboard
            </Typography>
            <Stack spacing={2}>
              <Box>
                <CustomFormLabel htmlFor="username">Full Name</CustomFormLabel>
                <CustomTextField id="username" variant="outlined" fullWidth />
              </Box>
              <Box>
                <CustomFormLabel htmlFor="username">Username / Email</CustomFormLabel>
                <CustomTextField id="username" variant="outlined" fullWidth />
              </Box>
              <Box>
                <CustomFormLabel htmlFor="username">Phone Number</CustomFormLabel>
                <CustomTextField id="username" variant="outlined" fullWidth />
              </Box>
              <Box>
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField id="password" type="password" variant="outlined" fullWidth />
              </Box>
              <Box>
                <CustomFormLabel htmlFor="password">Confirm Password</CustomFormLabel>
                <CustomTextField id="password" type="password" variant="outlined" fullWidth />
              </Box>
            </Stack>
            <Box component="form" onSubmit={handleRegister}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                sx={{ mt: 3 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  )
};

export default Register;
