/**
 * @format
 */
import { FormikHelpers, useFormik } from 'formik';
import { IQualification } from 'src/interface/qualification.types';
import * as Yup from 'yup';

const defaultValues: IQualification = {
  company_id: 0,
  qualification_name: '',
  qualification_code: '',
};

const schema = Yup.object().shape({
  qualification_name: Yup.string()
    .trim()
    .required('Qualification name is required')
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters'),

  qualification_code: Yup.string()
    .trim()
    .required('Qualification code is required')
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters'),

  company_id: Yup.number()
    .required('Hospitalis required')
    .moreThan(0, 'Hospitalis invalid'),
});

const useQualificationForm = (
  onSubmit: (
    values: IQualification,
    formikHelpers: FormikHelpers<IQualification>,
  ) => void | Promise<unknown>,
  initialValues: IQualification = defaultValues,
) => {
  return useFormik<IQualification>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useQualificationForm;
