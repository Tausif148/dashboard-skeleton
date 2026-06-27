import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Theme,
  Toolbar,
  styled,
  useMediaQuery,
} from '@mui/material';
import * as React from 'react';


import { CustomizerContext } from 'src/context/CustomizerContext';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import Notifications from 'src/layouts/full/vertical/header/Notification';
import Profile from 'src/layouts/full/vertical/header/Profile';
import Search from 'src/layouts/full/vertical/header/Search';
import config from "src/context/config";
import Logo from 'src/layouts/full/shared/logo/Logo';


const Header = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const { isLayout, setIsMobileSidebar, isMobileSidebar, activeMode, setActiveMode } = React.useContext(CustomizerContext);

  const TopbarHeight = config.topbarHeight;


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.up('lg')]: {
      minHeight: TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(() => ({ margin: '0 auto', width: '100%' }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={8}> 
      <ToolbarStyled
        sx={{
          maxWidth: isLayout === 'boxed' ? 'lg' : '100%!important',
          marginBottom: '10px !important',
        }}
      >
        <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
          <Logo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgDown ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => setIsMobileSidebar(!isMobileSidebar)}
          >
            <IconMenu2 />
          </IconButton>
        ) : (
          ''
        )}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Language /> */}
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}

          <IconButton size="large" color="inherit">
            {activeMode === 'light' ? (
              <IconMoon size="21" stroke="1.5" onClick={() => setActiveMode("dark")} />
            ) : (
              <IconSun size="21" stroke="1.5" onClick={() => setActiveMode("light")} />
            )}
          </IconButton>

          <Notifications />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
