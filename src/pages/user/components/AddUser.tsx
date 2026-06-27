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
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useUserActions } from 'src/apiActions/useUserActions';
import CityAutocomplete from 'src/components/GoogleLocation/CityAutocomplete';
import StateAutocomplete from 'src/components/GoogleLocation/StateAutocomplete';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useUserForm from 'src/forms/app/useUserForm';
import { AddIcon, CancelIcon } from 'src/icons/icons';
import { IUser } from 'src/interface/user.types';

interface AddUserProps {
  open: boolean;
  handleClose: () => void;
  editingUser?: IUser | null;
  refetch?: () => void;
}

function AddUser({ open, handleClose, editingUser }: AddUserProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useUserActions();

  const isEdit = Boolean(editingUser);

  const onSubmit = async (values: IUser) => {
    if (isEdit) {
      await tryUpdate(editingUser?.user_id || '', values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };

  //  formik init
  const formik = useUserForm(onSubmit);
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
    if (editingUser) {
      setValues({
        first_name: editingUser.first_name || '',
        last_name: editingUser.last_name || '',
        username: editingUser.username || '',
        password: editingUser.password || '',
        mobile_number: editingUser.mobile_number || '',
        address1: editingUser.address1 || '',
        address2: editingUser.address2 || '',
        city: editingUser.city || '',
        state: editingUser.state || '',
        country: editingUser.country || '',
        pincode: editingUser.pincode || '',
      });
    } else {
      resetForm();
    }
  }, [editingUser, open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '900px',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t('Edit User') : t('Add User')}
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
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel
                  sx={{
                    color: '#000',
                  }}
                >
                  {t('Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.first_name && !!errors.first_name}
                  helperText={(touched.first_name && errors.first_name) || ''}
                  id="first_name"
                  placeholder="Enter first name"
                  value={values.first_name}
                  onBlur={handleBlur('first_name')}
                  onChange={handleChange('first_name')}
                  sx={{}}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Last Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.last_name && !!errors.last_name}
                  helperText={(touched.last_name && errors.last_name) || ''}
                  id="last_name"
                  placeholder="Enter last name"
                  value={values.last_name}
                  onBlur={handleBlur('last_name')}
                  onChange={handleChange('last_name')}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('Country')}</CustomFormLabel>
                <Autocomplete
                  sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                  options={[{ label: 'India', value: 'India' }]}
                  getOptionLabel={(option) => option.label}
                  value={values.country ? { label: values.country, value: values.country } : null}
                  onChange={(_, newValue) => {
                    setFieldValue('country', newValue?.value || '');
                  }}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Country"
                      size="small"
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
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
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel
                  sx={{
                    color: '#000',
                  }}
                >
                  {t('State')}
                </CustomFormLabel>
                <StateAutocomplete
                  country={values.country}
                  value={values.state}
                  onChange={(val) => {
                    setFieldValue('state', val);
                    setFieldValue('city', '');
                  }}
                  error={touched.state && Boolean(errors.state)}
                  helperText={(touched.state && errors.state) || ''}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('City')}</CustomFormLabel>
                <CityAutocomplete
                  state={values.state}
                  value={values.city}
                  onChange={(val) => setFieldValue('city', val)}
                  error={touched.city && Boolean(errors.city)}
                  helperText={(touched.city && errors.city) || ''}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('Pin Code')}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.pincode && !!errors.pincode}
                  helperText={(touched.pincode && errors.pincode) || ''}
                  id="pincode"
                  placeholder="Enter pin code"
                  value={values.pincode}
                  onBlur={handleBlur('pincode')}
                  onChange={handleChange('pincode')}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('User Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.username && !!errors.username}
                  helperText={(touched.username && errors.username) || ''}
                  id="username"
                  placeholder="Enter username"
                  value={values.username}
                  onBlur={handleBlur('username')}
                  onChange={handleChange('username')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Password')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.password && !!errors.password}
                  helperText={(touched.password && errors.password) || ''}
                  id="password"
                  placeholder="Enter password"
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChange={handleChange('password')}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Mobile Number')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.mobile_number && !!errors.mobile_number}
                  helperText={(touched.mobile_number && errors.mobile_number) || ''}
                  id="mobile_number"
                  placeholder="Enter mobile number"
                  value={values.mobile_number}
                  onBlur={handleBlur('mobile_number')}
                  onChange={handleChange('mobile_number')}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('Address 1')}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={5}
                  error={!!touched.address1 && !!errors.address1}
                  helperText={(touched.address1 && errors.address1) || ''}
                  id="address1"
                  placeholder="Enter address 1"
                  value={values.address1}
                  onBlur={handleBlur('address1')}
                  onChange={handleChange('address1')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('Address 2')} </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={5}
                  error={!!touched.address2 && !!errors.address2}
                  helperText={(touched.address2 && errors.address2) || ''}
                  id="address2"
                  placeholder="Enter address 2"
                  value={values.address2}
                  onBlur={handleBlur('address2')}
                  onChange={handleChange('address2')}
                />
              </Box>
            </Stack>

            {/* Actions */}
            <Stack direction="row" justifyContent="start" spacing={2} pt={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                disabled={isSubmitting}
                sx={{
                  minWidth: 120,
                  backgroundColor: '#4f46e5',
                  '&:hover': {
                    backgroundColor: '#4f46e5',
                  },
                }}
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
      <ToastContainer />
    </Dialog>
  );
}

export default memo(AddUser);