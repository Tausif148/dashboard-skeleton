
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IAssignModuleMenu } from "src/interface/assignModuleMenu.types";
import * as Yup from "yup";

const defaultValues: IAssignModuleMenu = {
    plan_id: 0,
    module_ids: [],
    menu_ids: [],
}

const schema = Yup.object().shape({
    plan_id: Yup.number()
        .moreThan(0, "Please select a plan")
        .required("Plan is required"),

    module_ids: Yup.array()
        .min(1, "Select at least one module")
        .required("Module is required"),

    menu_ids: Yup.array()
        .min(1, "Select at least one menu")
        .required("Menu is required"),
});

const useAssignModuleMenuForm = (
    onSubmit: (
        values: IAssignModuleMenu,
        formikHelpers: FormikHelpers<IAssignModuleMenu>,
    ) => void | Promise<unknown>,
    initialValues: IAssignModuleMenu = defaultValues,
) => {
    return useFormik<IAssignModuleMenu>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit,
    });
};

export default useAssignModuleMenuForm;

