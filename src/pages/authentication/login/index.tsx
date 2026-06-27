// ----------------------------NEW-------------------------------
import { Box, Grid, Typography } from '@mui/material';
import loginBgNew from 'src/assets/login-bg/loginBgNew2.jpg';
import riceMealLogo from 'src/assets/login-bg/riceMealLogo-background-removed.png';
import PageContainer from 'src/components/container/PageContainer';
import AuthLogin from './components/AuthLogin';

const Login = () => {
  return (
    <>
      <PageContainer title="Login" description="Rice & Mill Industry Login">
        <Grid
          container
          sx={{
            minHeight: '100vh',
            backgroundImage: `url(${loginBgNew})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* LEFT CONTENT */}
          <Grid
            size={{ md: 4 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              mt: 10,
              pb: 16,
              color: '#1B5E20',
            }}
          >
            <Box
              component="img"
              src={riceMealLogo}
              alt="Doctor ERP Management System"
              sx={{
                width: 110,
                height: 'auto',
                marginBottom: '25px',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                borderLeft: '3px solid #2E7D32',
                pl: 2,
                mb: 6,
                borderRadius: 0,
              }}
            >
              <Typography variant="body1" sx={{ color: '#000', fontWeight: 500, lineHeight: 2 }}>
                Efficient Milling.
                <br />
                Better Quality.
                <br />
                Stronger Future.
              </Typography>
            </Box>
          </Grid>

          {/* CENTER LOGIN CARD */}
          <Grid
            size={{ xs: 12, md: 8 }}
            display="flex"
            justifyContent={{ xs: 'center', md: 'start' }}
            alignItems="center"
            sx={{
              px: { xs: 2, sm: 4, md: 2 },
              pb: 16,
              mt: { xs: 6, md: 3 },
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 420, md: 420 },
                p: 2,
                py: 5,
                borderRadius: '10px',
                background: '#FFFFFF',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                border: '1px solid #E8F5E9',
              }}
            >
              <AuthLogin
                title="Welcome Back !"
                subtext={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: '12px',
                      textAlign: 'center',
                      color: '#888',
                      mb: 2,
                      px: 5,
                    }}
                  >
                    Login to access your Doctor ERP Management System
                  </Typography>
                }
              />
            </Box>
          </Grid>

          {/* BOTTOM WAVE BAR */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '-15px',
              left: 0,
              right: 0,
              borderRadius: '40px 40px 0 0',
              py: 2.5,
              px: { xs: 2, md: 5 },
            }}
          >
            <Grid
              container
              justifyContent="start"
              spacing={6}
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {[
                { icon: '🌿', title: 'Farm Fresh', sub: 'Sourced with care' },
                { icon: '⚙️', title: 'Advanced Milling', sub: 'Technology Driven' },
                { icon: '🛡️', title: 'Pure Quality', sub: 'Our Promise' },
              ].map((item) => (
                <Grid key={item.title} display="flex" flexDirection="column" alignItems="center">
                  <Typography fontSize={28}>{item.icon}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#fff', fontSize: '0.7rem', marginTop: '.6rem' }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A5D6A7', fontSize: '0.6rem' }}>
                    {item.sub}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: 'center', color: '#A5D6A7', marginBottom: '6px' }}
            >
              © 2024 Doctor ERP Management System. All rights reserved.
            </Typography>
          </Box>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Login;
