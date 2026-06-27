import { useMemo } from 'react';

type MenuPermission = {
  is_add: number;
  is_view: number;
  is_update: number;
  is_delete: number;
};

const fullAccess: MenuPermission = {
  is_add: 1,
  is_view: 1,
  is_update: 1,
  is_delete: 1,
};

export default function useMenuPermissions(menuName: string): MenuPermission {
  return useMemo(() => {
    try {
      if (typeof window === 'undefined') return fullAccess;

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const role = String(user?.role || '').toLowerCase();

      // Non-employee users keep existing unrestricted behavior.
      if (role !== 'employee') {
        return fullAccess;
      }

      const modules = Array.isArray(user?.assigned_modules) ? user.assigned_modules : [];
      for (const module of modules) {
        const menus = Array.isArray(module?.menus) ? module.menus : [];
        const matchedMenu = menus.find(
          (menu: any) => String(menu?.menu_name || '').toLowerCase() === menuName.toLowerCase()
        );

        if (matchedMenu) {
          return {
            is_add: Number(matchedMenu?.is_add || 0),
            is_view: Number(matchedMenu?.is_view || 0),
            is_update: Number(matchedMenu?.is_update || 0),
            is_delete: Number(matchedMenu?.is_delete || 0),
          };
        }
      }

      return {
        is_add: 0,
        is_view: 0,
        is_update: 0,
        is_delete: 0,
      };
    } catch (e) {
      return fullAccess;
    }
  }, [menuName]);
}
