
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { ICompany } from "src/interface/company.types";
import * as Yup from "yup";

const defaultValues: ICompany = {
  user_id: 0,
  plan_id: 0,
  company_name: "",
  owner_name: "",
  email: "",
  password: "",
  mobile_number: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  GST_number: "",
  pan_number: "",
  registration_number: "",
  profile_image: "",
}

const schema = Yup.object().shape({
  company_name: Yup.string()
    .trim()
    .required("Hospitalname is required")
    .min(2, "Hospitalname must be at least 2 characters"),

  owner_name: Yup.string()
    .trim()
    .required("Owner name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .nullable(),

  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  address1: Yup.string().required("Address is required"),

  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),

  pincode: Yup.string()
    .matches(/^\d{6}$/, "Enter valid pincode")
    .required("Pincode is required"),

  GST_number: Yup.string().nullable(),
  pan_number: Yup.string().nullable(),

  registration_number: Yup.string().nullable(),
});

const useCompanyForm = (
  onSubmit: (
    values: ICompany,
    formikHelpers: FormikHelpers<ICompany>,
  ) => void | Promise<unknown>,
  initialValues: ICompany = defaultValues,
) => {
  return useFormik<ICompany>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useCompanyForm;

