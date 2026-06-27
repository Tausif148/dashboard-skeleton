import { Box, List, useMediaQuery } from '@mui/material';
import { useContext, useMemo } from 'react';
import { useLocation } from 'react-router';
import { CustomizerContext } from 'src/context/CustomizerContext';
import Menuitems from '../../../../menuItems/MenuItems';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));

  const { isSidebarHover, isCollapse, isMobileSidebar, setIsMobileSidebar } = useContext(CustomizerContext);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu: any = lgUp ? isCollapse == "mini-sidebar" && !isSidebarHover : '';

  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const filteredMenuItems = useMemo(() => {
    const normalize = (value: any) => (value || '').toString().trim().toLowerCase();
    const dashboardItems = Menuitems.filter((item: any) => normalize(item.title) === 'dashboard');
    const userRole = normalize(currentUser?.role || currentUser?.data?.role);

    if (userRole === 'superadmin' || userRole === 'super admin') {
      return Menuitems;
    }

    const assigned =
      currentUser?.company?.assigned_modules ||
      currentUser?.plants?.assigned_modules ||
      currentUser?.assigned_modules;
    if (!assigned || !Array.isArray(assigned) || assigned.length === 0) {
      return dashboardItems;
    }

    // build lookup: moduleName -> Set of menu names
    const moduleMap: Record<string, Set<string>> = {};
    assigned.forEach((m: any) => {
      const moduleName = normalize(m.module_name);
      moduleMap[moduleName] = new Set((m.menus || []).map((x: any) => normalize(x.menu_name)));
    });

    const result = Menuitems.reduce((acc: any[], item: any) => {
      if (item.children && item.children.length) {
        const titleNorm = normalize(item.title);
        if (moduleMap[titleNorm]) {
          const allowedChildren = item.children.filter((child: any) => moduleMap[titleNorm].has(normalize(child.title)));
          if (allowedChildren.length) {
            acc.push({ ...item, children: allowedChildren });
          }
        }
        return acc;
      }

      // single items: include if any module lists this title as a menu
      const itemTitleNorm = normalize(item.title);
      const included = Object.values(moduleMap).some((set) => set.has(itemTitleNorm));
      if (included) acc.push(item);
      return acc;
    }, [] as any[]);

    return result.length > 0 ? result : dashboardItems;
  }, [currentUser]);



  return (
    <Box sx={{ px: 0 }}>
      <List className="sidebarNav">
        {filteredMenuItems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

            // {/********If Sub Menu**********/}
          } else if (item.children) {
            return (
              <NavCollapse
                key={item.id}
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                onClick={() => setIsMobileSidebar(!isMobileSidebar)}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                key={item.id}
                item={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => setIsMobileSidebar(!isMobileSidebar)}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
