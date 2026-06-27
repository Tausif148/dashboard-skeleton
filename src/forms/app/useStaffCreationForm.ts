import { FormikHelpers, useFormik } from 'formik';
import { IManPower } from 'src/interface/manPower.types';
import * as Yup from 'yup';

const defaultValues: IManPower = {
  company_id: 0,
  employee_name: '',
  employee_code: '',
  email: '',
  password: '',
  dateofbirth: '',
  dateofjoining: '',
  dateofleaving: '',
  bloodgroup: '',
  qualification_id: 0,
  qualification_name: '',
  university: '',
  year_of_passing: '',
  percentage: '',
  specialization: '',
  department_id: 0,
  department_name: '',
  designation_id: 0,
  designation_name: '',
  mobile_number: '',
  address: '',
  pincode: '',
  employee_bank_name: '',
  bank_branch_name: '',
  account_number: '',
  ifsc_code: '',
  aadhar_number: '',
  pan_number: '',
  upload_aadhar_card: '',
  upload_pan_card: '',
  upload_profile_image: '',
};

const schema = Yup.object().shape({
  company_id: Yup.number().required('Hospitalis required'),

  employee_name: Yup.string().trim().required('Required'),
  employee_code: Yup.string().trim().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),

  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be 10 digits')
    .required('Required'),

  department_id: Yup.number().moreThan(0, 'Select department'),
  designation_id: Yup.number().moreThan(0, 'Select designation'),

  pincode: Yup.string().test(
    'pincode',
    'Must be 6 digits',
    (val) => !val || /^[0-9]{6}$/.test(val),
  ),
});

const useStaffCreationForm = (
  onSubmit: (values: IManPower, helpers: FormikHelpers<IManPower>) => void | Promise<unknown>,
  initialValues: IManPower = defaultValues,
) => {
  return useFormik<IManPower>({
    initialValues,
    validationSchema: schema, // ✅ FIXED
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });
};

export default useStaffCreationForm;
