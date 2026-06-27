
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IMenu } from "src/interface/menu.types";
import * as Yup from "yup";

const defaultValues: IMenu = {
    menu_name: "",
    module_id: 0,
}

const schema = Yup.object().shape({
  menu_name: Yup.string()
    .trim()
    .required("Menu name is required")
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters"),
    module_id: Yup.number()
    .required("Please select a module")
});

const useMenuForm = (
    onSubmit: (
        values: IMenu,
        formikHelpers: FormikHelpers<IMenu>,
    ) => void | Promise<unknown>,
    initialValues: IMenu = defaultValues,
) => {
    return useFormik<IMenu>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit,
    });
};

export default useMenuForm;

