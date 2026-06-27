import { AppBar, Box, IconButton, Stack, Toolbar, styled, useMediaQuery } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import Notifications from './Notification';
import Profile from './Profile';
import Search from './Search';

import { useContext } from 'react';
import { CustomizerContext } from '../../../../context/CustomizerContext';
import config from '../../../../context/config';
import Navigation from './Navigation';

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const { setIsCollapse, isCollapse, isMobileSidebar, setIsMobileSidebar } = useContext(CustomizerContext);

  const TopbarHeight = config.topbarHeight;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    backgroundColor: '#fff',
    borderBottom:'1px solid #E5E7EB',
    borderRadius: '15px 15px 0 0',
    marginBottom: '7px',
    [theme.breakpoints.up('lg')]: {
      minHeight: TopbarHeight,
    },
  }));


  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default" >
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => {
            // Toggle sidebar on both mobile and desktop based on screen size
            if (lgUp) {
              // For large screens, toggle between full-sidebar and mini-sidebar
              isCollapse === "full-sidebar" ? setIsCollapse("mini-sidebar") : setIsCollapse("full-sidebar");
            } else {
              // For smaller screens, toggle mobile sidebar
              setIsMobileSidebar(!isMobileSidebar);
            }
          }}
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        {lgUp ? (
          <>
            <Navigation />
          </>
        ) : null}

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

          {/* <IconButton size="large" color="inherit">
            {activeMode === 'light' ? (
              <IconMoon size="21" stroke="1.5" onClick={() => setActiveMode("dark")} />
            ) : (
              <IconSun size="21" stroke="1.5" onClick={() => setActiveMode("light")} />
            )}
          </IconButton> */}

          {/* <Notifications /> */}
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
