import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDepartmentActions } from 'src/apiActions/useDepartmentActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useDepartmentForm from 'src/forms/app/useDepartmentForm';
import useDecoded from 'src/hooks/useDecoded';
import { AddIcon, CancelIcon } from 'src/icons/icons';
import { IDepartment } from 'src/interface/department.types';

interface AddMenuProps {
  open: boolean;
  handleClose: () => void;
  editingDepartment?: IDepartment | null;
  refetch?: () => void;
}

function AddDepartment({ open, handleClose, editingDepartment }: AddMenuProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useDepartmentActions();
  const { company_id } = useDecoded();

  const isEdit = Boolean(editingDepartment);

  const onSubmit = async (values: IDepartment) => {
    if (isEdit) {
      await tryUpdate(editingDepartment?.department_id || '', values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };

  //  formik init
  const formik = useDepartmentForm(onSubmit, {
    company_id: company_id,
    department_name: '',
    department_code: '',
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
    setValues,
  } = formik;

  useEffect(() => {
    if (editingDepartment) {
      setValues({
        company_id: editingDepartment.company_id || 0,
        department_code: editingDepartment.department_code || '',
        department_name: editingDepartment.department_name || '',
      });
    } else {
      resetForm({
        values: {
          company_id: company_id,
          department_code: '',
          department_name: '',
        },
      });
    }
  }, [editingDepartment, company_id, resetForm, setValues]);

  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t('Edit Department') : t('Add Department')}
          <IconButton
            aria-label="close"
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
            onClick={handleClose}
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
                <CustomTextField
                  fullWidth
                  error={!!touched.department_name && !!errors.department_name}
                  helperText={(touched.department_name && errors.department_name) || ''}
                  id="department_name"
                  placeholder="Enter department name"
                  value={values.department_name}
                  onBlur={handleBlur('department_name')}
                  onChange={handleChange('department_name')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('Department Code')}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.department_code && !!errors.department_code}
                  helperText={(touched.department_code && errors.department_code) || ''}
                  id="department_code"
                  placeholder="Enter department code"
                  value={values.department_code}
                  onBlur={handleBlur('department_code')}
                  onChange={handleChange('department_code')}
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

export default memo(AddDepartment);
