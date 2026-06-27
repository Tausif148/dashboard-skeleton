
import { Box, Grid } from '@mui/material';
import Logo from 'src/assets/logo.png';
import AdLoginCarousel from './components/AdLoginCarousel';

const LoginLeftGrid = () => (
  <Grid
    sx={{
      position: 'relative',
      bgcolor: '#ebe8e3ff',
      '&:before': {
        content: '""',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: '0.3',
      },
    }}
    size={{
      xs: 12,
      sm: 12,
      lg: 7,
      xl: 8,
    }}
  >
    <Box position="relative">
      <Box px={3}>
        <img src={Logo} style={{ width: '177px', height: '114px' }} />
      </Box>

      <Box>
        <AdLoginCarousel bg="#ebe8e3ff" />
      </Box>
    </Box>
  </Grid>
);

export default LoginLeftGrid;
