
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IAssignRole } from "src/interface/assignRole.type";
import * as Yup from "yup";

const defaultValues: IAssignRole = {
    role_id: 0,
    company_id: 0,
    plan_id: 0,
    assigned_modules: [],
    assigned_menus: []

}

const schema = Yup.object().shape({
    role_id: Yup.number()
        .required("Please Select Role")
        .min(1, "Invalid role"),
});

const useAssignRoleForm = (
    onSubmit: (
        values: IAssignRole,
        formikHelpers: FormikHelpers<IAssignRole>,
    ) => void | Promise<unknown>,
    initialValues: IAssignRole = defaultValues,
) => {
    return useFormik<IAssignRole>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit,
    });
};

export default useAssignRoleForm;

