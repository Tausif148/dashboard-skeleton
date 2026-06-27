
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IDepartment } from "src/interface/department.types";
import * as Yup from "yup";

const defaultValues: IDepartment = {
  company_id: 0,
  department_name: "",
  department_code: ""
}

const schema = Yup.object().shape({
  department_name: Yup.string()
    .trim()
    .required("Department name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),

  department_code: Yup.string()
    .trim()
    .required("Department code is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),

  company_id: Yup.number()
    .required("Hospitalis required")
    .moreThan(0, "Hospitalis invalid"),
});

const useDepartmentForm = (
  onSubmit: (
    values: IDepartment,
    formikHelpers: FormikHelpers<IDepartment>,
  ) => void | Promise<unknown>,
  initialValues: IDepartment = defaultValues,
) => {
  return useFormik<IDepartment>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useDepartmentForm;

