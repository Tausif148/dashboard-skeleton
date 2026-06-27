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
import { useDesignationActions } from 'src/apiActions/useDesignationActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useDesignationForm from 'src/forms/app/useDesignationForm';
import useDecoded from 'src/hooks/useDecoded';
import { AddIcon, CancelIcon } from 'src/icons/icons';
import { IDesignation } from 'src/interface/designation.types';
import { useFetchDepartment } from 'src/queries/useFetchDepartment';

interface AddMenuProps {
  open: boolean;
  handleClose: () => void;
  editingDesignation?: IDesignation | null;
  refetch?: () => void;
}

function AddDesignation({ open, handleClose, editingDesignation, refetch }: AddMenuProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useDesignationActions();
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

  const isEdit = Boolean(editingDesignation);

  const onSubmit = async (values: IDesignation) => {
    if (isEdit) {
      await tryUpdate(editingDesignation?.designation_id || '', values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };

  //  formik init
  const formik = useDesignationForm(onSubmit, {
    company_id: company_id,
    department_id: 0,
    designation_name: '',
    designation_code: '',
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
    if (editingDesignation) {
      setValues({
        department_id: editingDesignation.department_id || 0,
        company_id: editingDesignation.company_id || 0,
        // plan_id: editingDesignation.plan_id || 0,
        designation_code: editingDesignation.designation_code || '',
        designation_name: editingDesignation.designation_name || '',
      });
    } else {
      resetForm({
        values: {
          department_id: 0,
          company_id: company_id,
          // plan_id: plantId,
          designation_code: '',
          designation_name: '',
        },
      });
    }
  }, [editingDesignation, company_id, resetForm, setValues]);

  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t('Edit Designation') : t('Add Designation')}
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
                  {t('Designation Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.designation_name && !!errors.designation_name}
                  helperText={(touched.designation_name && errors.designation_name) || ''}
                  id="designation_name"
                  placeholder="Enter designation name"
                  value={values.designation_name}
                  onBlur={handleBlur('designation_name')}
                  onChange={handleChange('designation_name')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Designation Code')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.designation_code && !!errors.designation_code}
                  helperText={(touched.designation_code && errors.designation_code) || ''}
                  id="designation_code"
                  placeholder="Enter designation code"
                  value={values.designation_code}
                  onBlur={handleBlur('designation_code')}
                  onChange={handleChange('designation_code')}
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

export default memo(AddDesignation);
