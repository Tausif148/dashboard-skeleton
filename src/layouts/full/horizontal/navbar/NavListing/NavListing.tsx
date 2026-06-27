// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Box, List, Theme, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router';
import { CustomizerContext } from 'src/context/CustomizerContext';
import Menudata from '../Menudata';
import NavCollapse from '../NavCollapse/NavCollapse';
import NavItem from '../NavItem/NavItem';


const NavListing = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const { isCollapse, isSidebarHover } = useContext(CustomizerContext);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? isCollapse == "mini-sidebar" && !isSidebarHover : '';

  return (
    <Box>
      <List sx={{ p: 0, display: 'flex', gap: '3px', zIndex: '100' }}>
        {Menudata.map((item) => {
          if (item.children) {
            return (
              <NavCollapse
                key={item.id} onClick={undefined}
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu} onClick={function (): void {
                throw new Error('Function not implemented.');
              }} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default NavListing;
