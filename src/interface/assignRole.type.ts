export interface IAssignRole {
  assigned_id?: string
  company_id: number
  role_id: number
  assigned_modules: number[]
  assigned_menus: AssignedMenu[]
  plan_id: number
}

export interface AssignedMenu {
  menu_id: number
  is_add: number
  is_update: number
  is_delete: number
  is_view: number
}