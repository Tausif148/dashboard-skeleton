
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IBranch } from "src/interface/branch.types";
import * as Yup from "yup";

const defaultValues: IBranch = {
  plan_id: "",
  company_id: 0,
  branch_name: "",
  branch_code: "",
  email: "",
  password: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  GST_number: "",
  pan_number: "",
  registration_number: "",
  branch_logo: "",
};

const schema = Yup.object().shape({
  company_id: Yup.number()
    .required("Compnay is required"),

  branch_name: Yup.string()
    .trim()
    .required("Branch name is required")
    .min(2, "Branch name must be at least 2 characters"),

  branch_code: Yup.string()
    .trim()
    .required("Branch code is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  address1: Yup.string()
    .trim()
    .required("Address line 1 is required"),

  city: Yup.string()
    .trim()
    .required("City is required"),

  state: Yup.string()
    .trim()
    .required("State is required"),

  country: Yup.string()
    .trim()
    .required("Country is required"),

  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Enter a valid 6-digit pincode"),

  GST_number: Yup.string()
    .trim()
    .matches(/^[0-9A-Z]{15}$/, "Enter a valid GST number")
    .nullable(),

  pan_number: Yup.string()
    .trim()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN number")
    .nullable(),

  registration_number: Yup.string()
    .trim()
    .nullable(),

  // branch_logo: Yup.string()
  //   .nullable(),
});

const useBranchForm = (
  onSubmit: (
    values: IBranch,
    formikHelpers: FormikHelpers<IBranch>,
  ) => void | Promise<unknown>,
  initialValues: IBranch = defaultValues,
) => {
  return useFormik<IBranch>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useBranchForm;

