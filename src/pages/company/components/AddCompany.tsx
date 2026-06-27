import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCompanyActions } from 'src/apiActions/useCompanyActions';
import { useUploadImageActions } from 'src/apiActions/useUploadImageActions';
import CityAutocomplete from 'src/components/GoogleLocation/CityAutocomplete';
import StateAutocomplete from 'src/components/GoogleLocation/StateAutocomplete';
import Slider from 'src/components/PopupModals/Slider';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useCompanyForm from 'src/forms/app/useCompanyForm';
import { AddIcon, CancelIcon, CloseIcon, Person } from 'src/icons/icons';
import { ICompany } from 'src/interface/company.types';
import { useFetchPlan } from 'src/queries/useFetchPlan';
import { useFetchUser } from 'src/queries/useFetchUser';

interface AddCompanyProps {
  open: boolean;
  handleClose: () => void;
  editingCompany?: ICompany | null;
  refetch?: () => void;
}

function AddCompany({ open, handleClose, editingCompany }: AddCompanyProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useCompanyActions();
  const { data: user } = useFetchUser({ page: 1, search: '' });
  const { data: plan } = useFetchPlan({ page: 1, search: '' });

  const { tryUploadImage } = useUploadImageActions();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // ADD THIS: Create a local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      setUploading(true);
      const res: any = await tryUploadImage({ file: file });
      if (res?.image_url) {
        setPreviewUrl(res.image_url);
        setFieldValue('profile_image', res?.unique_id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const userList = useMemo(
    () =>
      user?.data?.users?.map((item: any) => ({
        code: item.user_id,
        name: item.name,
      })) || [],
    [user],
  );

  const planList = useMemo(
    () =>
      plan?.data?.plans?.map((item: any) => ({
        code: item.plan_id,
        name: item.plan_name,
      })) || [],
    [plan],
  );

  const isEdit = Boolean(editingCompany);

  const onSubmit = async (values: ICompany) => {
    if (isEdit) {
      await tryUpdate(String(editingCompany?.company_id ?? ''), values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };

  //  formik init

  const formik = useCompanyForm(onSubmit);

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
    if (editingCompany) {
      setValues({
        user_id: editingCompany.user_id || 0,
        plan_id: editingCompany.plan_id || 0,
        company_name: editingCompany.company_name || '',
        owner_name: editingCompany.owner_name || '',
        email: editingCompany.email || '',
        password: editingCompany.password || '',
        mobile_number: editingCompany.mobile_number || '',
        address1: editingCompany.address1 || '',
        address2: editingCompany.address2 || '',
        city: editingCompany.city || '',
        state: editingCompany.state || '',
        country: editingCompany.country || '',
        pincode: editingCompany.pincode || '',
        GST_number: editingCompany.GST_number || '',
        pan_number: editingCompany.pan_number || '',
        registration_number: editingCompany.registration_number || '',

        // image id
        profile_image:
          (editingCompany as any)?.profile_image?.image_id || '',
      });

      // image preview
      setPreviewUrl(
        (editingCompany as any)?.profile_image?.image_url || null
      );
    } else {
      resetForm();
      setImageFile(null);
      setPreviewUrl(null);
    }
  }, [editingCompany, open]);

  return (
    <Slider open={open} size="md" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t('Edit Company') : t('Add Company')}
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
          <Stack alignItems="center" spacing={2} width="100%" mb={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {previewUrl ? (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Profile Preview"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      mb: 1,
                      border: '2px solid #ccc',
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1,
                      bgcolor: 'primary.main',
                      fontSize: 40,
                      border: '2px solid #ccc',
                    }}
                  >
                    <Person sx={{ fontSize: 50 }} />
                  </Avatar>
                )}

                {previewUrl && (
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setPreviewUrl(null);
                      setFieldValue('profile_image', '');
                    }}
                    sx={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      width: 22,
                      height: 22,
                      bgcolor: 'error.main',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <CloseIcon sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                )}
              </Box>

              {/* Upload Button */}
              <Button variant="outlined" component="label" size="small" disabled={uploading}>
                {uploading ? 'Uploading...' : t('Select Image')}
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Company Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.company_name && !!errors.company_name}
                  helperText={(touched.company_name && errors.company_name) || ''}
                  id="company_name"
                  placeholder="Enter Company name"
                  value={values.company_name}
                  onBlur={handleBlur('company_name')}
                  onChange={handleChange('company_name')}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Owner Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.owner_name && !!errors.owner_name}
                  helperText={(touched.owner_name && errors.owner_name) || ''}
                  id="owner_name"
                  placeholder="Enter owner name"
                  value={values.owner_name}
                  onBlur={handleBlur('owner_name')}
                  onChange={handleChange('owner_name')}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('User Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                  options={userList || []}
                  getOptionLabel={(option) => option.name}
                  value={userList.find((opt: any) => opt.code === values.user_id) || null}
                  onChange={(_, newValue) => {
                    setFieldValue('user_id', newValue?.code || '');
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      placeholder="Select User"
                      size="small"
                      helperText={(touched.user_id && errors.user_id) || ''}
                      error={touched.user_id && Boolean(errors.user_id)}
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
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Plan Name')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                  options={planList || []}
                  getOptionLabel={(option) => option.name}
                  value={planList.find((opt: any) => opt.code === values.plan_id) || null}
                  onChange={(_, newValue) => {
                    setFieldValue('plan_id', newValue?.code || '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Plan"
                      size="small"
                      helperText={(touched.plan_id && errors.plan_id) || ''}
                      error={touched.plan_id && Boolean(errors.plan_id)}
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
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Email')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.email && !!errors.email}
                  helperText={(touched.email && errors.email) || ''}
                  id="email"
                  placeholder="Enter email"
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChange={handleChange('email')}
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
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                {t('Country')} <span style={{ color: 'red' }}>*</span>

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
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('State')} <span style={{ color: 'red' }}>*</span>
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
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('City')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>

                <CityAutocomplete
                  state={values.state}
                  value={values.city}
                  onChange={(val) => setFieldValue('city', val)}
                  error={touched.city && Boolean(errors.city)}
                  helperText={(touched.city && errors.city) || ''}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('PinCode')} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>

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
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('GST Number')}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.GST_number && !!errors.GST_number}
                  helperText={(touched.GST_number && errors.GST_number) || ''}
                  id="GST_number"
                  placeholder="Enter GST number"
                  value={values.GST_number}
                  onBlur={handleBlur('GST_number')}
                  onChange={handleChange('GST_number')}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('Pan Number')}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.pan_number && !!errors.pan_number}
                  helperText={(touched.pan_number && errors.pan_number) || ''}
                  id="pan_number"
                  placeholder="Enter pan number"
                  value={values.pan_number}
                  onBlur={handleBlur('pan_number')}
                  onChange={handleChange('pan_number')}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
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
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t('Registration Number')}
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.registration_number && !!errors.registration_number}
                  helperText={(touched.registration_number && errors.registration_number) || ''}
                  id="registration_number"
                  placeholder="Enter registration number"
                  value={values.registration_number}
                  onBlur={handleBlur('registration_number')}
                  onChange={handleChange('registration_number')}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t('Address 1')} </CustomFormLabel>
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
                <CustomFormLabel sx={{ color: '#000' }}>{t('Address 2')}</CustomFormLabel>
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
    </Slider>
  );
}

export default memo(AddCompany);