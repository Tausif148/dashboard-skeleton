
export interface IManPower {
  employee_id?: string;
  company_id: number;

  // Personal Details
  employee_name: string;
  employee_code: string;
  email: string;
  password: string;
  dateofbirth: string;
  dateofjoining: string;
  dateofleaving: string;
  bloodgroup: string;

  // Qualification
  qualification_id: number;
  qualification_name: string;   // ✅ added — used in Step 2 & Summary
  university: string;           // ✅ added — used in Step 2
  year_of_passing: string;      // ✅ added — used in Step 2
  percentage: string;           // ✅ added — used in Step 2
  specialization: string;       // ✅ added — used in Step 2

  // Account Details
  department_id: number;
  department_name: string;
  designation_id: number;
  designation_name: string;
  mobile_number: string;
  address: string;
  pincode: string;

  // Bank Details
  employee_bank_name: string;
  bank_branch_name: string;
  account_number: string;
  ifsc_code: string;

  // Documents
  aadhar_number: string;
  pan_number: string;
  upload_aadhar_card: string;
  upload_pan_card: string;
  upload_profile_image: string;
}

