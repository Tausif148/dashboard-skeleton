
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IRole } from "src/interface/role.types";
import * as Yup from "yup";

const defaultValues: IRole = {
    role: "",
}

const schema = Yup.object().shape({
  role: Yup.string()
    .trim()
    .required("Role name is required")
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters"),
});

const useRoleForm = (
    onSubmit: (
        values: IRole,
        formikHelpers: FormikHelpers<IRole>,
    ) => void | Promise<unknown>,
    initialValues: IRole = defaultValues,
) => {
    return useFormik<IRole>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit,
    });
};

export default useRoleForm;

