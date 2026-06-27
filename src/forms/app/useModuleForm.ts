
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IModule } from "src/interface/module.types";
import * as Yup from "yup";

const defaultValues: IModule = {
    module_name: "",
}

const schema = Yup.object().shape({
  module_name: Yup.string()
    .trim()
    .required("Module name is required")
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters"),
});

const useModuleForm = (
    onSubmit: (
        values: IModule,
        formikHelpers: FormikHelpers<IModule>,
    ) => void | Promise<unknown>,
    initialValues: IModule = defaultValues,
) => {
    return useFormik<IModule>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit,
    });
};

export default useModuleForm;

