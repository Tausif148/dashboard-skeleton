import { uniqueId } from 'lodash';
interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

import {
  IconAperture,
  IconBuildingBank,
  IconBuildingFactory,
  IconBuildingWarehouse,
  IconClipboardData,
  IconClipboardList,
  IconFileInvoice,
  IconFileText,
  IconHierarchy,
  IconLayoutGrid,
  IconList,
  IconPackage,
  IconReportAnalytics,
  IconSettings,
  IconShieldCheck,
  IconTruckDelivery,
  IconUser,
  IconUserCog,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/dashboard',
    chipColor: 'secondary',
  },

  {
    id: uniqueId(),
    title: 'User',
    icon: IconUser,
    type: ['Club Admin'],
    href: '/user',
  },

  {
    id: uniqueId(),
    title: 'Module',
    icon: IconLayoutGrid,
    type: ['Club Admin'],
    href: '/module',
  },
  {
    id: uniqueId(),
    title: 'Menu',
    icon: IconList,
    type: ['Club Admin'],
    href: '/menu',
  },
  {
    id: uniqueId(),
    title: 'Plan',
    icon: IconClipboardList,
    type: ['Club Admin'],
    href: '/plan',
  },
  {
    id: uniqueId(),
    title: 'Assign module menu',
    icon: IconHierarchy,
    type: ['Club Admin'],
    href: '/assign-module-menu',
  },
  {
    id: uniqueId(),
    title: 'Company',
    icon: IconBuildingBank,
    type: ['Club Admin'],
    href: '/company',
  },

  {
    id: uniqueId(),
    title: 'Role',
    icon: IconShieldCheck,
    type: ['Club Admin'],
    href: '/role',
  },
  {
    id: uniqueId(),
    title: 'Manage staff',
    icon: IconUsersGroup,
    href: '/manage-staff',
    children: [
      {
        id: uniqueId(),
        title: 'Department',
        icon: IconBuildingFactory,
        href: '/manage-staff/department',
      },
      {
        id: uniqueId(),
        title: 'Sub department',
        icon: IconHierarchy,
        href: '/manage-staff/sub-department',
      },
      {
        id: uniqueId(),
        title: 'Designation',
        icon: IconClipboardData,
        href: '/manage-staff/designation',
      },
      {
        id: uniqueId(),
        title: 'Staff creation',
        icon: IconUsers,
        href: '/manage-staff/staff-creation',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Manage role',
    icon: IconUserCog,
    href: '/manage-role',
    children: [
      {
        id: uniqueId(),
        title: 'Assign staff',
        icon: IconUsers,
        href: '/manage-role/assign-staff',
      },
      {
        id: uniqueId(),
        title: 'Assign role',
        icon: IconHierarchy,
        href: '/manage-role/assign-role',
      },
    ],
  },
];
export default Menuitems;
