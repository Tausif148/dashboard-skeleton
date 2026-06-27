// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { appRoutes } from './appRoutes';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/index')));
const User = Loadable(lazy(() => import('../pages/user/index')));
const Module = Loadable(lazy(() => import('../pages/modules/index')));
const Menu = Loadable(lazy(() => import('../pages/menus/index')));
const Plan = Loadable(lazy(() => import('../pages/plan/index')));
const AssignModuleMenu = Loadable(lazy(() => import('../pages/assignModuleMenu/index')));
const Hospital = Loadable(lazy(() => import('../pages/company/index')));
const Plants = Loadable(lazy(() => import('../pages/plants/index')));

// Manage staff
const Department = Loadable(lazy(() => import('../pages/manageStaff/department/index')));
const Qualification = Loadable(lazy(() => import('../pages/manageStaff/qualification/index')));
const SubDepartment = Loadable(lazy(() => import('../pages/manageStaff/subDepartment/index')));
const Designation = Loadable(lazy(() => import('../pages/manageStaff/designation/index')));
const StaffCreation = Loadable(lazy(() => import('../pages/manageStaff/staffCreation/index')));

// Manage Role
const Role = Loadable(lazy(() => import('../pages/role/index')));
const AssignRole = Loadable(lazy(() => import('../pages/manageRole/assignRoles/index')));
const AssignStaff = Loadable(lazy(() => import('../pages/manageRole/assignStaff/index')));

// Authentication
const Error = Loadable(lazy(() => import('../pages/authentication/Error')));
const Login = Loadable(lazy(() => import('../pages/authentication/login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register/index')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { index: true, element: <Navigate to={appRoutes.dashboard} replace /> },
      { path: appRoutes.dashboard, element: <Dashboard /> },
      { path: appRoutes.user, element: <User /> },
      { path: appRoutes.module, element: <Module /> },
      { path: appRoutes.menu, element: <Menu /> },
      { path: appRoutes.plan, element: <Plan /> },
      { path: appRoutes.company, element: <Hospital /> },
      { path: appRoutes.plants, element: <Plants /> },

      { path: appRoutes.assignModuleMenu, element: <AssignModuleMenu /> },

      // Manage staff
      { path: appRoutes.department, element: <Department /> },
      { path: appRoutes.qualification, element: <Qualification /> },
      { path: appRoutes.subDepartment, element: <SubDepartment /> },
      { path: appRoutes.designation, element: <Designation /> },
      { path: appRoutes.StaffCreation, element: <StaffCreation /> },

      // Manage role
      { path: appRoutes.role, element: <Role /> },
      { path: appRoutes.assignRole, element: <AssignRole /> },
      { path: appRoutes.assignStaff, element: <AssignStaff /> },

      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);
export default router;
