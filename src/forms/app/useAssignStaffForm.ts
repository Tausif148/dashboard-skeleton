
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IAssignStaff } from "src/interface/assignStaff.type";
import * as Yup from "yup";

const defaultValues: IAssignStaff = {
    role_id: 0,
    company_id: 0,
    employee_id: 0,
}

const schema = Yup.object().shape({
    role_id: Yup.number()
        .required("Please Select Role")
        .min(1, "Invalid role"),
});

const useAssignStaffForm = (
    onSubmit: (
        values: IAssignStaff,
        formikHelpers: FormikHelpers<IAssignStaff>,
    ) => void | Promise<unknown>,
    initialValues: IAssignStaff = defaultValues,
) => {
    return useFormik<IAssignStaff>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit,
    });
};

export default useAssignStaffForm;

