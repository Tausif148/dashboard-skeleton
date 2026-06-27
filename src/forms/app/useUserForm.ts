/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from 'formik';
import { IUser } from 'src/interface/user.types';
import * as Yup from 'yup';

const defaultValues: IUser = {
  first_name: '',
  last_name: '',
  username: '',
  password: '',
  mobile_number: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
};

const schema = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .required('First name is required')
    .min(2, 'Minimum 2 characters')
    .max(30, 'Maximum 30 characters'),

  last_name: Yup.string()
    .trim()
    .required('Last name is required')
    .min(2, 'Minimum 2 characters')
    .max(30, 'Maximum 30 characters'),

  username: Yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters'),

  password: Yup.string().required('Password is required'),

  mobile_number: Yup.string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
});

const useUserForm = (
  onSubmit: (values: IUser, formikHelpers: FormikHelpers<IUser>) => void | Promise<unknown>,
  initialValues: IUser = defaultValues,
) => {
  return useFormik<IUser>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useUserForm;
