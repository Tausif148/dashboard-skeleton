import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQualificationActions } from 'src/apiActions/useQualificationActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useQualificationForm from 'src/forms/app/useQualificationForm';
import useDecoded from 'src/hooks/useDecoded';
import { AddIcon, CancelIcon } from 'src/icons/icons';
import { IQualification } from 'src/interface/qualification.types';

interface AddQualificationProps {
  open: boolean;
  handleClose: () => void;
  editingQualification?: IQualification | null;
  refetch?: () => void;
}

function AddQualification({ open, handleClose, editingQualification }: AddQualificationProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useQualificationActions();
  const { company_id } = useDecoded();

  const isEdit = Boolean(editingQualification);

  const onSubmit = async (values: IQualification) => {
    if (isEdit) {
      await tryUpdate(editingQualification?.qualification_id || '', values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };

  // formik init
  const formik = useQualificationForm(onSubmit, {
    company_id: company_id,
    qualification_name: '',
    qualification_code: '',
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
    if (editingQualification) {
      setValues({
        company_id: editingQualification.company_id || 0,
        qualification_code: editingQualification.qualification_code || '',
        qualification_name: editingQualification.qualification_name || '',
      });
    } else {
      resetForm({
        values: {
          company_id: company_id,
          qualification_code: '',
          qualification_name: '',
        },
      });
    }
  }, [editingQualification, company_id, resetForm, setValues]);

  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t('Edit Qualification') : t('Add Qualification')}
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
                  {t('Qualification Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.qualification_name && !!errors.qualification_name}
                  helperText={(touched.qualification_name && errors.qualification_name) || ''}
                  id="qualification_name"
                  placeholder="Enter qualification name"
                  value={values.qualification_name}
                  onBlur={handleBlur('qualification_name')}
                  onChange={handleChange('qualification_name')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Qualification Code')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.qualification_code && !!errors.qualification_code}
                  helperText={(touched.qualification_code && errors.qualification_code) || ''}
                  id="qualification_code"
                  placeholder="Enter qualification code"
                  value={values.qualification_code}
                  onBlur={handleBlur('qualification_code')}
                  onChange={handleChange('qualification_code')}
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

export default memo(AddQualification);
