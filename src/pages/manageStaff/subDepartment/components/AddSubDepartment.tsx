import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubDepartmentActions } from 'src/apiActions/useSubDepartmentActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useSubDepartmentForm from 'src/forms/app/useSubDepartmentForm';
import useDecoded from 'src/hooks/useDecoded';
import { AddIcon, CancelIcon } from 'src/icons/icons';
import { ISubDepartment } from 'src/interface/subDepartment.types';
import { useFetchDepartment } from 'src/queries/useFetchDepartment';

interface AddMenuProps {
  open: boolean;
  handleClose: () => void;
  editingSubDepartment?: ISubDepartment | null;
  refetch?: () => void;
}

function AddSubDepartment({ open, handleClose, editingSubDepartment, refetch }: AddMenuProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useSubDepartmentActions();
  const { company_id } = useDecoded();

  const { data: department } = useFetchDepartment({ page: 1, search: '' });

  const departmentList = useMemo(
    () =>
      (department?.data?.departments || [])
        .filter((item: any) => Number(item.company_id) === Number(company_id))
        .map((item: any) => ({
          code: item.department_id,
          name: item.department_name,
        })) || [],
    [department, company_id],
  );

  const isEdit = Boolean(editingSubDepartment);
  const onSubmit = async (values: ISubDepartment) => {
    if (isEdit) {
      await tryUpdate(editingSubDepartment?.sub_department_id || '', values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };

  //  formik init
  const formik = useSubDepartmentForm(onSubmit, {
    company_id: company_id,
    department_id: 0,
    sub_department_name: '',
    sub_department_code: '',
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
    setValues,
  } = formik;

  useEffect(() => {
    if (editingSubDepartment) {
      setValues({
        department_id: editingSubDepartment.department_id || 0,
        company_id: editingSubDepartment.company_id || 0,
        // plan_id: editingSubDepartment.plan_id || 0,
        sub_department_code: editingSubDepartment.sub_department_code || '',
        sub_department_name: editingSubDepartment.sub_department_name || '',
      });
    } else {
      resetForm({
        values: {
          department_id: 0,
          company_id: company_id,
          // plan_id: 0,
          sub_department_code: '',
          sub_department_name: '',
        },
      });
    }
  }, [editingSubDepartment, company_id, resetForm, setValues]);

  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t('Edit Sub-Department') : t('Add Sub-Department')}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#fff',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                transform: 'scale(1.1)',
              },
            }}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Department Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                  options={departmentList || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    departmentList.find(
                      (opt: any) => Number(opt.code) === Number(values.department_id),
                    ) || null
                  }
                  onChange={(_, newValue) => {
                    setFieldValue('department_id', newValue?.code || 0); // ✅
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Department"
                      size="small"
                      helperText={(touched.department_id && errors.department_id) || ''}
                      error={touched.department_id && Boolean(errors.department_id)}
                      sx={{
                        '& .MuiInputBase-root': {
                          padding: '0px 8px',
                          minHeight: '43px',
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 0px',
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Sub Department Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.sub_department_name && !!errors.sub_department_name}
                  helperText={(touched.sub_department_name && errors.sub_department_name) || ''}
                  id="sub_department_name"
                  placeholder="Enter sub-department name"
                  value={values.sub_department_name}
                  onBlur={handleBlur('sub_department_name')}
                  onChange={handleChange('sub_department_name')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Sub Department Code')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.sub_department_code && !!errors.sub_department_code}
                  helperText={(touched.sub_department_code && errors.sub_department_code) || ''}
                  id="sub_department_code"
                  placeholder="Enter sub-department code"
                  value={values.sub_department_code}
                  onBlur={handleBlur('sub_department_code')}
                  onChange={handleChange('sub_department_code')}
                />
              </Box>
            </Stack>

            {/* Actions */}
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  minWidth: 120,
                  backgroundColor: '#4f46e5',
                  '&:hover': { backgroundColor: '#4f46e5' },
                }}
                disabled={isSubmitting}
              >
                {isEdit ? t('Update') : t('Submit')}
              </Button>
              <Button
                color="error"
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={handleClose}
                sx={{ minWidth: 120 }}
              >
                {t('Close')}
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default memo(AddSubDepartment);
