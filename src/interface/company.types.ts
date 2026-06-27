export interface ICompany {
  company_id?: number;
  user_id: number;
  plan_id: number;
  company_name: string;
  owner_name: string;
  email: string;
  password?: string;
  mobile_number: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  GST_number?: string;
  pan_number?: string;
  registration_number?: string;
  profile_image?: string;
}

