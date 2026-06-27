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
import { useMenuActions } from 'src/apiActions/useMenuActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useMenuForm from 'src/forms/app/useMenuForm';
import { AddIcon, CancelIcon } from 'src/icons/icons';
import { IMenu } from 'src/interface/menu.types';
import { useFetchModule } from 'src/queries/useFetchModule';

interface AddMenuProps {
  open: boolean;
  handleClose: () => void;
  editingMenu?: IMenu | null;
  refetch?: () => void;
}

function AddMenu({ open, handleClose, editingMenu }: AddMenuProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useMenuActions();
  const { data: module } = useFetchModule({ page: 1, search: '' });

  const moduleList = useMemo(
    () =>
      module?.data?.modules?.map((item: any) => ({
        code: item.module_id,
        name: item.module_name,
      })) || [],
    [module],
  );

  const isEdit = Boolean(editingMenu);

  const onSubmit = async (values: IMenu) => {
    if (isEdit) {
      await tryUpdate(editingMenu?.menu_id || '', values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };

  // //  formik init

  const formik = useMenuForm(onSubmit);

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
    if (editingMenu) {
      setValues({
        menu_name: editingMenu.menu_name || '',
        module_id: editingMenu.module_id || 0,
      });
    } else {
      resetForm();
    }
  }, [editingMenu, open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          overflow: 'hidden',
          width: '100%',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {' '}
          {isEdit ? t('Edit Menu') : t('Add Menu')}
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
                  {t('Menu Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.menu_name && !!errors.menu_name}
                  helperText={(touched.menu_name && errors.menu_name) || ''}
                  id="menu_name"
                  placeholder="Enter menu name"
                  value={values.menu_name}
                  onBlur={handleBlur('menu_name')}
                  onChange={handleChange('menu_name')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Module')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                  options={moduleList || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    moduleList.find((opt: any) => Number(opt.code) === Number(values.module_id)) ||
                    null
                  }
                  onChange={(_, newValue) => {
                    setFieldValue('module_id', newValue?.code || 0); // ✅
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Module"
                      size="small"
                      helperText={(touched.module_id && errors.module_id) || ''}
                      error={touched.module_id && Boolean(errors.module_id)}
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
            {/* Actions */}
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  minWidth: 120,
                  backgroundColor: '#4f46e5',
                  '&:hover': {
                    backgroundColor: '#4f46e5',
                  },
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

export default memo(AddMenu);
