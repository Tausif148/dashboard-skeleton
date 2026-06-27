import { FormikHelpers, useFormik } from "formik";
import { IDesignation } from "src/interface/designation.types";
import * as Yup from "yup";

const defaultValues: IDesignation = {
  company_id: 0,
  department_id: 0,
  designation_name: "",
  designation_code: "",
};

const schema = Yup.object().shape({
  company_id: Yup.number()
    .required("Hospitalis required")
    .moreThan(0, "Hospitalis invalid"),

  department_id: Yup.number()
    .required("Department is required")
    .moreThan(0, "Please select a department"),

  designation_name: Yup.string()
    .trim()
    .required("Designation name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),

  designation_code: Yup.string()
    .trim()
    .required("Designation code is required"),
});

const useDesignationForm = (
  onSubmit: (
    values: IDesignation,
    formikHelpers: FormikHelpers<IDesignation>,
  ) => void | Promise<unknown>,
  initialValues: IDesignation = defaultValues,
) => {
  return useFormik<IDesignation>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useDesignationForm;