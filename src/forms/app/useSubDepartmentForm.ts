import { FormikHelpers, useFormik } from "formik";
import { ISubDepartment } from "src/interface/subDepartment.types";
import * as Yup from "yup";

const defaultValues: ISubDepartment = {
  company_id: 0,
  department_id: 0,
  sub_department_name: "",
  sub_department_code: "",
};

const schema = Yup.object().shape({
  sub_department_name: Yup.string()
    .trim()
    .required("Sub department name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),

  sub_department_code: Yup.string()
    .trim()
    .required("Sub department code is required"),

  company_id: Yup.number()
    .required("Hospitalis required")
    .moreThan(0, "Hospitalis invalid"),

  // ❌ REMOVED - plan_id doesn't exist in ISubDepartment
  // plan_id was blocking ALL form submissions silently

  department_id: Yup.number()
    .required("Department is required")
    .moreThan(0, "Please select a department"),
});

const useSubDepartmentForm = (
  onSubmit: (
    values: ISubDepartment,
    formikHelpers: FormikHelpers<ISubDepartment>
  ) => void | Promise<unknown>,
  initialValues: ISubDepartment = defaultValues
) => {
  return useFormik<ISubDepartment>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useSubDepartmentForm;