
/**
 * @format
 */
// import ErrorMessages from "@/constants/errorMessages/auth";
import { FormikHelpers, useFormik } from "formik";
import { IPlan } from "src/interface/plan.types";
import * as Yup from "yup";

const defaultValues: IPlan = {
    plan_name: "",
    plan_price:0,
    plan_description:"",
}

const schema = Yup.object().shape({
 plan_name: Yup.string()
    .trim()
    .required("Plan name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),

  plan_price: Yup.number()
    .typeError("Price must be a number")
    .required("Plan price is required")
    .positive("Price must be greater than 0"),

//   plan_description: Yup.string()
//     .trim()
//     .required("Description is required")
//     .min(10, "Minimum 10 characters")
//     .max(200, "Maximum 200 characters"),
});

const usePlanForm = (
    onSubmit: (
        values: IPlan,
        formikHelpers: FormikHelpers<IPlan>,
    ) => void | Promise<unknown>,
    initialValues: IPlan = defaultValues,
) => {
    return useFormik<IPlan>({
        initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit,
    });
};

export default usePlanForm;

