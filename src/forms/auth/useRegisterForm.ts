// src/hooks/useLoginForm.ts
import { FormikHelpers, useFormik } from "formik";
import { IRegisterRequest } from "src/interface/auth.types";
import * as Yup from "yup";

export const defaultValues: IRegisterRequest = {
    fullName: "",
    email: "",
    password: "",
};


const schema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
})
const useRegisterForm = (
    onSubmit: (
        values: IRegisterRequest,
        formikHelpers: FormikHelpers<IRegisterRequest>
    ) => void | Promise<unknown>,
    initialValues: IRegisterRequest = defaultValues
) => {
    return useFormik<IRegisterRequest>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema, // add Yup validation here if needed
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        onSubmit,
    });
};

export default useRegisterForm;
