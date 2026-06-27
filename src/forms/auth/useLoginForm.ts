// src/hooks/useLoginForm.ts
import { FormikHelpers, useFormik } from "formik";
import { ILoginRequest } from "src/interface/auth.types";
import * as Yup from "yup";

export const defaultValues: ILoginRequest = {
    username: "",
    password: "",
};


const schema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
})
const useLoginForm = (
    onSubmit: (
        values: ILoginRequest,
        formikHelpers: FormikHelpers<ILoginRequest>
    ) => void | Promise<unknown>,
    initialValues: ILoginRequest = defaultValues
) => {
    return useFormik<ILoginRequest>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema, // add Yup validation here if needed
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        onSubmit,
    });
};

export default useLoginForm;
