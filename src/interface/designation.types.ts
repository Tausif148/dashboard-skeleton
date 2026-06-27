export interface IDesignation {
  designation_id?: string;
  company_id: number;
  department_id: number;
  designation_name: string;
  designation_code: string;
  // ❌ no plan_id
}