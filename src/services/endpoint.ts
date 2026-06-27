import { BASE_URL } from 'src/config/config';

// ------------------------Authentication------------------
const authentication = {
  register: 'register',
  login: 'login',
  signIn: 'signIn',
  logout: 'logout',
};

const AUTHENTICATION_API = {
  LOGIN: `${BASE_URL}/v1/login/`,
  LOG_OUT: `${BASE_URL}/auth/${authentication.logout}`,
};

// ------------------------Upload image------------------
const UPLOAD_IMAGE_API = {
  CREATE_UPLOAD_IMAGE: `${BASE_URL}/v1/upload/upload_image/`,
};

// ------------------------Dashboard------------------
const DASHBOARD_API = {
  GET_DASHBOARD: `${BASE_URL}/v1/reports/dashboard`,
};

const USER_API = {
  GET_ALL_USERS: `${BASE_URL}/v1/user/`,
  GET_USER: `${BASE_URL}/v1/user/`,
  CREATE_USER: `${BASE_URL}/v1/user/`,
  UPDATE_USER: (id: string) => `${BASE_URL}/v1/user/${id}`,
  DELETE_USER: (id: string) => `${BASE_URL}/v1/user/${id}`,
};

const MODULE_API = {
  GET_ALL_MODULES: `${BASE_URL}/v1/modules/`,
  CREATE_MODULE: `${BASE_URL}/v1/modules/`,
  UPDATE_MODULE: (id: string) => `${BASE_URL}/v1/modules/${id}`,
  DELETE_MODULE: (id: string) => `${BASE_URL}/v1/modules/${id}`,
};

const MENU_API = {
  GET_ALL_MENUS: `${BASE_URL}/v1/menus/`,
  CREATE_MENU: `${BASE_URL}/v1/menus/`,
  UPDATE_MENU: (id: string) => `${BASE_URL}/v1/menus/${id}`,
  DELETE_MENU: (id: string) => `${BASE_URL}/v1/menus/${id}`,
};

const PLAN_API = {
  GET_ALL_PLANS: `${BASE_URL}/v1/plans/`,
  CREATE_PLAN: `${BASE_URL}/v1/plans/`,
  UPDATE_PLAN: (id: string) => `${BASE_URL}/v1/plans/${id}`,
  DELETE_PLAN: (id: string) => `${BASE_URL}/v1/plans/${id}`,
};

const ASSIGN_MODULE_MENU_API = {
  GET_ALL_ASSIGN_MODULE_MENU: `${BASE_URL}/v1/assign-modules-menus/`,
  CREATE_ASSIGN_MODULE_MENU: `${BASE_URL}/v1/assign-modules-menus/`,
  UPDATE_ASSIGN_MODULE_MENU: (id: string) => `${BASE_URL}/v1/assign-modules-menus/${id}`,
  DELETE_ASSIGN_MODULE_MENU: (id: string) => `${BASE_URL}/v1/assign-modules-menus/${id}`,
};

const COMPANIES_API = {
  GET_ALL_COMPANIES: `${BASE_URL}/v1/companies/`,
  CREATE_COMPANIES: `${BASE_URL}/v1/companies/`,
  UPDATE_COMPANIES: (id: string) => `${BASE_URL}/v1/companies/${id}`,
  DELETE_COMPANIES: (id: string) => `${BASE_URL}/v1/companies/${id}`,
};

const BRANCH_API = {
  GET_ALL_BRANCHES: `${BASE_URL}/v1/companies_branches/`,
  CREATE_BRANCH: `${BASE_URL}/v1/companies_branches/`,
  UPDATE_BRANCH: (id: string) => `${BASE_URL}/v1/companies_branches/${id}`,
  DELETE_BRANCH: (id: string) => `${BASE_URL}/v1/companies_branches/${id}`,
};

// ------------------------Manage stafff------------------
const QUALIFICATION_API = {
  GET_ALL_QUALIFICATIONS: `${BASE_URL}/v1/qualification/`,
  CREATE_QUALIFICATION: `${BASE_URL}/v1/qualification/`,
  UPDATE_QUALIFICATION: (id: string) => `${BASE_URL}/v1/qualification/${id}`,
  DELETE_QUALIFICATION: (id: string) => `${BASE_URL}/v1/qualification/${id}`,
};

const DEPARTMENT_API = {
  GET_ALL_DEPARTMENTS: `${BASE_URL}/v1/department/`,
  CREATE_DEPARTMENT: `${BASE_URL}/v1/department/`,
  UPDATE_DEPARTMENT: (id: string) => `${BASE_URL}/v1/department/${id}`,
  DELETE_DEPARTMENT: (id: string) => `${BASE_URL}/v1/department/${id}`,
};

const SUB_DEPARTMENT_API = {
  GET_ALL_SUB_DEPARTMENTS: `${BASE_URL}/v1/subdepartment/`,
  CREATE_SUB_DEPARTMENT: `${BASE_URL}/v1/subdepartment/`,
  UPDATE_SUB_DEPARTMENT: (id: string) => `${BASE_URL}/v1/subdepartment/${id}`,
  DELETE_SUB_DEPARTMENT: (id: string) => `${BASE_URL}/v1/subdepartment/${id}`,
};

const DESIGNATION_API = {
  GET_ALL_DESIGNATIONS: `${BASE_URL}/v1/designation/`,
  CREATE_DESIGNATION: `${BASE_URL}/v1/designation/`,
  UPDATE_DESIGNATION: (id: string) => `${BASE_URL}/v1/designation/${id}`,
  DELETE_DESIGNATION: (id: string) => `${BASE_URL}/v1/designation/${id}`,
};

const MANPOWER_API = {
  GET_ALL_MANPOWER: `${BASE_URL}/v1/manpower/`,
  CREATE_MANPOWER: `${BASE_URL}/v1/manpower/`,
  UPDATE_MANPOWER: (id: string) => `${BASE_URL}/v1/manpower/${id}`,
  DELETE_MANPOWER: (id: string) => `${BASE_URL}/v1/manpower/${id}`,
};

// ------------------------Manage Role------------------
const ROLES_API = {
  GET_ALL_ROLES: `${BASE_URL}/v1/roles/`,
  CREATE_ROLE: `${BASE_URL}/v1/roles/`,
  UPDATE_ROLE: (id: string) => `${BASE_URL}/v1/roles/${id}`,
  DELETE_ROLE: (id: string) => `${BASE_URL}/v1/roles/${id}`,
};

const ASSIGN_MODULE_TO_ROLE_API = {
  GET_ALL_ASSIGN_ROLES: `${BASE_URL}/v1/assign_modules_to_role/`,
  CREATE_ASSIGN_ROLES: `${BASE_URL}/v1/assign_modules_to_role/`,
  UPDATE_ASSIGN_ROLES: (id: string) => `${BASE_URL}/v1/assign_modules_to_role/${id}`,
  DELETE_ASSIGN_ROLES: (id: string) => `${BASE_URL}/v1/assign_modules_to_role/${id}`,
};

const ASSIGN_ROLE_TO_EMPLOYEE_API = {
  GET_ALL_ASSIGN_STAFF: `${BASE_URL}/v1/assign_modules_to_role/employee_role_assignment`,
  CREATE_ASSIGN_STAFF: `${BASE_URL}/v1/assign_modules_to_role/assign_role_to_employee`,
  UPDATE_ASSIGN_STAFF: (id: string) =>
    `${BASE_URL}/v1/assign_modules_to_role/employee_role_assignment/${id}`,
  DELETE_ASSIGN_STAFF: (id: string) =>
    `${BASE_URL}/v1/assign_modules_to_role/employee_role_assignment/${id}`,
};

// Other APIs can be added here following the same pattern

export {
  ASSIGN_MODULE_MENU_API,
  ASSIGN_MODULE_TO_ROLE_API,
  ASSIGN_ROLE_TO_EMPLOYEE_API,
  AUTHENTICATION_API,
  BRANCH_API,
  COMPANIES_API,
  DASHBOARD_API,
  DEPARTMENT_API,
  DESIGNATION_API,
  MANPOWER_API,
  MENU_API,
  MODULE_API,
  PLAN_API,
  QUALIFICATION_API,
  ROLES_API,
  SUB_DEPARTMENT_API,
  UPLOAD_IMAGE_API,
  USER_API
};

