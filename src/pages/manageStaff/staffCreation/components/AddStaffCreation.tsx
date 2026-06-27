import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStaffCreationActions } from 'src/apiActions/useStaffCreationActions';
import { useUploadImageActions } from 'src/apiActions/useUploadImageActions';
import useStaffCreationForm from 'src/forms/app/useStaffCreationForm';
import useDecoded from 'src/hooks/useDecoded';
import { CancelIcon } from 'src/icons/icons';
import { IManPower } from 'src/interface/manPower.types';
import { useFetchDepartment } from 'src/queries/useFetchDepartment';
import { useFetchDesignation } from 'src/queries/useFetchDesignation';
import { useFetchQualification } from 'src/queries/useFetchQualification';

// MUI Date Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface AddHospitalProps {
  open: boolean;
  handleClose: () => void;
  editingStaff?: IManPower | null;
  refetch?: () => void;
}

const DNBTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px 4px 0 0',
    '& fieldset': { borderColor: '#dcdcdc' },
    '&:hover fieldset': { borderColor: '#bfbfbf' },
    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
  },
  '& .MuiInputLabel-root': { fontSize: '12px' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
}));

// ✅ Clean payload before sending to API
const cleanPayload = (values: IManPower, isEdit: boolean) => {
  const payload: any = { ...values };

  // Remove empty password on edit
  if (isEdit && !payload.password) delete payload.password;

  // Remove ALL empty strings, nulls, undefined
  Object.keys(payload).forEach((key) => {
    const val = payload[key];
    if (val === '' || val === null || val === undefined) {
      delete payload[key];
    }
  });

  // Remove zero-value IDs — backend rejects 0 as foreign key
  if (!payload.qualification_id) delete payload.qualification_id;
  if (!payload.department_id) delete payload.department_id;
  if (!payload.designation_id) delete payload.designation_id;

  // Remove UI-only fields — backend doesn't have these columns
  delete payload.department_name;
  delete payload.designation_name;
  delete payload.qualification_name;

  // Fix upload fields — send only string ID, not object
  ['upload_aadhar_card', 'upload_pan_card', 'upload_profile_image'].forEach((field) => {
    const val = payload[field];
    if (!val) {
      delete payload[field];
    } else if (typeof val === 'object') {
      if (val?.image_id) {
        payload[field] = val.image_id; // unwrap object → string ID
      } else {
        delete payload[field]; // empty object → remove
      }
    }
    // plain string → leave as-is
  });

  return payload as IManPower;
};

function AddStaffCreation({ open, handleClose, editingStaff, refetch }: AddHospitalProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useStaffCreationActions();
  const { tryUploadImage } = useUploadImageActions();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tab, setTab] = useState(0);
  const isSubmittingRef = useRef(false); 

  const { data: department } = useFetchDepartment({ page: 1, search: '' });
  const { data: designation } = useFetchDesignation({ page: 1, search: '' });
  const { data: qualification } = useFetchQualification({ page: 1, search: '' });

  const { company_id } = useDecoded();

  const departmentList = useMemo<{ code: number; name: string }[]>(
    () =>
      (department?.data?.departments || [])
        .filter((item: any) => Number(item.company_id) === Number(company_id))
        .map((item: any) => ({
          code: item.department_id,
          name: item.department_name,
        })) || [],
    [department, company_id],
  );

  const designationList = useMemo<{ code: number; name: string }[]>(
    () =>
      (designation?.data?.designations || [])
        .filter((item: any) => Number(item.company_id) === Number(company_id))
        .map((item: any) => ({
          code: item.designation_id,
          name: item.designation_name,
        })) || [],
    [designation, company_id],
  );

  const qualificationList = useMemo<{ code: number; name: string }[]>(
    () =>
      (qualification?.data?.qualifications || [])
        .filter((item: any) => Number(item.company_id) === Number(company_id))
        .map((item: any) => ({
          code: item.qualification_id,
          name: item.qualification_name,
        })) || [],
    [qualification, company_id],
  );

  const isEdit = Boolean(editingStaff);

  const onSubmit = async (values: IManPower) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    try {
      const payload = cleanPayload(values, isEdit);
      console.log('Final payload:', JSON.stringify(payload, null, 2)); // ✅ verify in console
      console.log('Payload being sent:', JSON.stringify(payload, null, 2));

      if (isEdit) {
        await tryUpdate(editingStaff?.employee_id || '', payload);
      } else {
        await tryAdd(payload);
      }
      refetch?.();
      resetForm();
      setTab(0);
      setPreviewUrl(null);
      handleClose();
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const formik = useStaffCreationForm(onSubmit, { company_id: company_id } as unknown as IManPower);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    validateForm,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
    setValues,
  } = formik;

  // ✅ Reset tab and preview when dialog closes
  useEffect(() => {
    if (!open) {
      setTab(0);
      setPreviewUrl(null);
    }
  }, [open]);

  // ✅ Populate form on edit, reset on create
  useEffect(() => {
    if (editingStaff) {
      setValues({
        company_id: editingStaff.company_id || company_id,
        employee_name: editingStaff.employee_name || '',
        employee_code: editingStaff.employee_code || '',
        email: editingStaff.email || '',
        password: '',
        qualification_id: editingStaff.qualification_id || 0,
        qualification_name: editingStaff.qualification_name || '',
        university: editingStaff.university || '',
        year_of_passing: editingStaff.year_of_passing || '',
        percentage: editingStaff.percentage || '',
        specialization: editingStaff.specialization || '',
        department_id: editingStaff.department_id || 0,
        department_name: editingStaff.department_name || '',
        designation_id: editingStaff.designation_id || 0,
        designation_name: editingStaff.designation_name || '',
        mobile_number: editingStaff.mobile_number || '',
        address: editingStaff.address || '',
        pincode: editingStaff.pincode || '',
        bloodgroup: editingStaff.bloodgroup || '',
        dateofbirth: editingStaff.dateofbirth || '',
        dateofjoining: editingStaff.dateofjoining || '',
        dateofleaving: editingStaff.dateofleaving || '',
        aadhar_number: editingStaff.aadhar_number || '',
        pan_number: editingStaff.pan_number || '',
        employee_bank_name: editingStaff.employee_bank_name || '',
        bank_branch_name: editingStaff.bank_branch_name || '',
        account_number: editingStaff.account_number || '',
        ifsc_code: editingStaff.ifsc_code || '',
        upload_aadhar_card: editingStaff.upload_aadhar_card || '',
        upload_pan_card: editingStaff.upload_pan_card || '',
        upload_profile_image: editingStaff.upload_profile_image || '',
      });
    } else {
      resetForm({
        values: {
          company_id: company_id,
          employee_name: '',
          employee_code: '',
          email: '',
          password: '',
          qualification_id: 0,
          qualification_name: '',
          university: '',
          year_of_passing: '',
          percentage: '',
          specialization: '',
          department_id: 0,
          department_name: '',
          designation_id: 0,
          designation_name: '',
          mobile_number: '',
          address: '',
          pincode: '',
          bloodgroup: '',
          dateofbirth: '',
          dateofjoining: '',
          dateofleaving: '',
          aadhar_number: '',
          pan_number: '',
          employee_bank_name: '',
          bank_branch_name: '',
          account_number: '',
          ifsc_code: '',
          upload_aadhar_card: '',
          upload_pan_card: '',
          upload_profile_image: '',
        },
      });
    }
  }, [editingStaff, open]);

  const handleNext = async () => {
    const errors = await formik.validateForm();

    if (tab === 0) {
      if (errors.employee_name || errors.employee_code || errors.email) {
        formik.setTouched({
          employee_name: true,
          employee_code: true,
          email: true,
        });
        return;
      }
    }

    if (tab === 2) {
      if (errors.mobile_number || errors.department_id || errors.designation_id) {
        formik.setTouched({
          mobile_number: true,
          department_id: true,
          designation_id: true,
        });
        return;
      }
    }

    setTab((prev) => prev + 1);
  };
  const handleBack = () => setTab((prev) => Math.max(prev - 1, 0));

  const handleDatePickerChange =
    (field: 'dateofbirth' | 'dateofjoining' | 'dateofleaving') => (dateValue: string) => {
      setFieldValue(field, dateValue);
      setFieldTouched(field, true, true);
    };

  // ✅ Store only string ID from upload response
  const handleFileUpload =
    (field: 'upload_profile_image' | 'upload_aadhar_card' | 'upload_pan_card') =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const res: any = await tryUploadImage({ file });
        if (field === 'upload_profile_image') {
          setPreviewUrl(res?.image_url || null);
        }
        // ✅ store only the string ID, not the whole response object
        setFieldValue(field, res?.unique_id || res?.image_id || '');
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '12px', overflow: 'hidden', width: '100%', maxWidth: '950px' },
      }}
    >
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && tab !== 5) e.preventDefault();
        }}
      >
        <DialogContent sx={{ p: 0, height: '80vh', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', position: 'relative', margin: '15px', height: '100%' }}>
            {/* CLOSE BUTTON */}
            <IconButton
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                color: '#4f46e5',
                transition: 'all 0.2s ease',
                '&:hover': { color: '#000', transform: 'scale(1.1)' },
              }}
              onClick={handleClose}
            >
              <CancelIcon />
            </IconButton>

            {/* LEFT PANEL */}
            <Box
              sx={{
                width: '30%',
                bgcolor: '#e9f3f1',
                p: 4,
                borderRight: '1px solid #eee',
                borderRadius: '15px 0 0 15px',
                height: '100%',
              }}
            >
              <Box mb={4}>
                <Box sx={{ fontWeight: 900, fontSize: 18, color: '#000000' }}></Box>
                <Box sx={{ fontSize: 14, mt: 1, fontWeight: 700 }}>Staff creation</Box>
              </Box>

              {[
                'Personal Details',
                'Qualification',
                'Account Details',
                'Documents',
                'Summary',
                'Review',
              ].map((label, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 5,
                    position: 'relative',
                    fontWeight: '900',
                    cursor: 'pointer',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: '13px',
                      top: '32px',
                      width: '2px',
                      height: '40px',
                      bgcolor: index <= tab ? '#4f46e5' : '#d3d3d3',
                      display: index === 5 ? 'none' : 'block',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      bgcolor: tab >= index ? '#4f46e5' : '#d3d3d3',
                      color: '#fff',
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      zIndex: 1,
                    }}
                  >
                    {tab > index ? '✓' : index + 1}
                  </Box>
                  <Box sx={{ fontWeight: tab === index ? 700 : 400, color: '#000' }}>{label}</Box>
                </Box>
              ))}
            </Box>

            {/* RIGHT FORM */}
            <Box sx={{ width: '70%', p: 4, height: '100%', overflowY: 'auto' }}>
              {/* STEP 1 — Personal Details */}
              {tab === 0 && (
                <Box>
                  <Box sx={{ fontSize: 11, mb: 1, fontWeight: 700 }}>YOUR PERSONAL DETAILS</Box>
                  <Box mt={2}>
                    <Box sx={{ fontSize: 11, mb: 1, fontWeight: 700 }}>Profile Image</Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Button
                        component="label"
                        variant="contained"
                        sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#000000' } }}
                      >
                        Upload Profile Image
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleFileUpload('upload_profile_image')}
                        />
                      </Button>
                      {uploading && <Box sx={{ color: '#555' }}>Uploading...</Box>}
                    </Stack>
                    {previewUrl && (
                      <Box
                        component="img"
                        src={previewUrl}
                        alt="Profile preview"
                        sx={{
                          width: 120,
                          height: 120,
                          mt: 2,
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: '1px solid #ddd',
                        }}
                      />
                    )}
                  </Box>
                  <Stack direction="row" spacing={2} mb={2} mt={5}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Employee Name"
                      value={values.employee_name}
                      onBlur={handleBlur('employee_name')}
                      onChange={handleChange('employee_name')}
                      error={!!touched.employee_name && !!errors.employee_name}
                      helperText={(touched.employee_name && errors.employee_name) || ''}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Employee Code"
                      value={values.employee_code}
                      onBlur={handleBlur('employee_code')}
                      onChange={handleChange('employee_code')}
                      error={!!touched.employee_code && !!errors.employee_code}
                      helperText={(touched.employee_code && errors.employee_code) || ''}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      type="email"
                      label="Email"
                      value={values.email}
                      onBlur={handleBlur('email')}
                      onChange={handleChange('email')}
                      error={!!touched.email && !!errors.email}
                      helperText={(touched.email && errors.email) || ''}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Password"
                      value={values.password}
                      onBlur={handleBlur('password')}
                      onChange={handleChange('password')}
                      error={!!touched.password && !!errors.password}
                      helperText={(touched.password && errors.password) || ''}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        format="DD/MM/YYYY"
                        value={values.dateofbirth ? dayjs(values.dateofbirth) : null}
                        onChange={(newValue) => {
                          setFieldValue(
                            'dateofbirth',
                            newValue ? newValue.format('YYYY-MM-DD') : '',
                          );
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            onBlur: () => setFieldTouched('dateofbirth', true, true),
                            error: !!touched.dateofbirth && !!errors.dateofbirth,
                            helperText: (touched.dateofbirth && errors.dateofbirth) || '',
                            InputLabelProps: {
                              shrink: true,
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Joining"
                        format="DD/MM/YYYY"
                        value={values.dateofjoining ? dayjs(values.dateofjoining) : null}
                        onChange={(newValue) => {
                          setFieldValue(
                            'dateofjoining',
                            newValue ? newValue.format('YYYY-MM-DD') : '',
                          );
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            onBlur: () => setFieldTouched('dateofjoining', true, true),
                            error: !!touched.dateofjoining && !!errors.dateofjoining,
                            helperText: (touched.dateofjoining && errors.dateofjoining) || '',
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Leaving"
                        format="DD/MM/YYYY"
                        value={values.dateofleaving ? dayjs(values.dateofleaving) : null}
                        onChange={(newValue) => {
                          setFieldValue(
                            'dateofleaving',
                            newValue ? newValue.format('YYYY-MM-DD') : '',
                          );
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            onBlur: () => setFieldTouched('dateofleaving', true, true),
                            error: !!touched.dateofleaving && !!errors.dateofleaving,
                            helperText: (touched.dateofleaving && errors.dateofleaving) || '',
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <DNBTextField
                      fullWidth
                      size="small"
                      select
                      label="Blood Group"
                      value={values.bloodgroup || ''}
                      onBlur={handleBlur('bloodgroup')}
                      onChange={handleChange('bloodgroup')}
                    >
                      <MenuItem value="" disabled>
                        Select Blood Group
                      </MenuItem>
                      {bloodGroups.map((group) => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      ))}
                    </DNBTextField>
                  </Stack>
                </Box>
              )}

              {/* STEP 2 — Qualification */}
              {tab === 1 && (
                <Box>
                  <Box sx={{ fontSize: 11, mb: 1, fontWeight: 700 }}>QUALIFICATION DETAILS</Box>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      select
                      label="Qualification"
                      value={values.qualification_id || ''}
                      onBlur={handleBlur('qualification_id')}
                      onChange={handleChange('qualification_id')}
                      error={!!touched.qualification_id && !!errors.qualification_id}
                      helperText={(touched.qualification_id && errors.qualification_id) || ''}
                    >
                      <MenuItem value="" disabled>
                        Select Qualification
                      </MenuItem>
                      {qualificationList.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </DNBTextField>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="University / Board"
                      value={values.university || ''}
                      onBlur={handleBlur('university')}
                      onChange={handleChange('university')}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Year of Passing"
                      value={values.year_of_passing || ''}
                      onBlur={handleBlur('year_of_passing')}
                      onChange={handleChange('year_of_passing')}
                      error={!!touched.year_of_passing && !!errors.year_of_passing}
                      helperText={(touched.year_of_passing && errors.year_of_passing) || ''}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Percentage / Grade"
                      value={values.percentage || ''}
                      onBlur={handleBlur('percentage')}
                      onChange={handleChange('percentage')}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Specialization"
                      value={values.specialization || ''}
                      onBlur={handleBlur('specialization')}
                      onChange={handleChange('specialization')}
                    />
                  </Stack>
                </Box>
              )}

              {/* STEP 3 — Account Details */}
              {tab === 2 && (
                <Box>
                  <Box sx={{ fontSize: 11, mb: 1, fontWeight: 700 }}>ACCOUNT DETAILS</Box>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      select
                      label="Department"
                      value={values.department_id || ''}
                      onBlur={handleBlur('department_id')}
                      onChange={handleChange('department_id')}
                      error={!!touched.department_id && !!errors.department_id}
                      helperText={(touched.department_id && errors.department_id) || ''}
                    >
                      <MenuItem value="" disabled>
                        Select Department
                      </MenuItem>
                      {departmentList.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </DNBTextField>
                    <DNBTextField
                      fullWidth
                      size="small"
                      select
                      label="Designation"
                      value={values.designation_id || ''}
                      onBlur={handleBlur('designation_id')}
                      onChange={handleChange('designation_id')}
                      error={!!touched.designation_id && !!errors.designation_id}
                      helperText={(touched.designation_id && errors.designation_id) || ''}
                    >
                      <MenuItem value="" disabled>
                        Select Designation
                      </MenuItem>
                      {designationList.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </DNBTextField>
                  </Stack>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Mobile Number"
                      value={values.mobile_number}
                      onBlur={handleBlur('mobile_number')}
                      onChange={handleChange('mobile_number')}
                      error={!!touched.mobile_number && !!errors.mobile_number}
                      helperText={(touched.mobile_number && errors.mobile_number) || ''}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Pincode"
                      value={values.pincode}
                      onBlur={handleBlur('pincode')}
                      onChange={handleChange('pincode')}
                      error={!!touched.pincode && !!errors.pincode}
                      helperText={(touched.pincode && errors.pincode) || ''}
                    />
                  </Stack>
                  <DNBTextField
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    label="Address"
                    value={values.address}
                    onBlur={handleBlur('address')}
                    onChange={handleChange('address')}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ fontSize: 11, mt: 3, mb: 1, fontWeight: 700 }}>BANK DETAILS</Box>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Bank Name"
                      value={values.employee_bank_name}
                      onBlur={handleBlur('employee_bank_name')}
                      onChange={handleChange('employee_bank_name')}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Branch Name"
                      value={values.bank_branch_name}
                      onBlur={handleBlur('bank_branch_name')}
                      onChange={handleChange('bank_branch_name')}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Account Number"
                      value={values.account_number}
                      onBlur={handleBlur('account_number')}
                      onChange={handleChange('account_number')}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="IFSC Code"
                      value={values.ifsc_code}
                      onBlur={handleBlur('ifsc_code')}
                      onChange={handleChange('ifsc_code')}
                      error={!!touched.ifsc_code && !!errors.ifsc_code}
                      helperText={(touched.ifsc_code && errors.ifsc_code) || ''}
                    />
                  </Stack>
                </Box>
              )}

              {/* STEP 4 — Documents */}
              {tab === 3 && (
                <Box>
                  <Box sx={{ fontSize: 11, mb: 1, fontWeight: 700 }}>DOCUMENTS</Box>
                  <Stack direction="row" spacing={2} mb={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Aadhar Number"
                      value={values.aadhar_number}
                      onBlur={handleBlur('aadhar_number')}
                      onChange={handleChange('aadhar_number')}
                      error={!!touched.aadhar_number && !!errors.aadhar_number}
                      helperText={(touched.aadhar_number && errors.aadhar_number) || ''}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="PAN Number"
                      value={values.pan_number}
                      onBlur={handleBlur('pan_number')}
                      onChange={handleChange('pan_number')}
                      error={!!touched.pan_number && !!errors.pan_number}
                      helperText={(touched.pan_number && errors.pan_number) || ''}
                    />
                  </Stack>
                  <Box mt={2}>
                    <Box sx={{ fontSize: 11, mb: 1, fontWeight: 700 }}>Upload Documents</Box>
                    <Stack direction="row" spacing={2} mb={2}>
                      <DNBTextField
                        fullWidth
                        size="small"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: 'image/*,application/pdf' }}
                        label="Upload Aadhar Card"
                        onChange={handleFileUpload('upload_aadhar_card')}
                      />
                      <DNBTextField
                        fullWidth
                        size="small"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: 'image/*,application/pdf' }}
                        label="Upload PAN Card"
                        onChange={handleFileUpload('upload_pan_card')}
                      />
                    </Stack>
                  </Box>
                </Box>
              )}

              {/* STEP 5 — Summary */}
              {tab === 4 && (
                <Box>
                  <Box sx={{ fontSize: 11, mb: 2, fontWeight: 700 }}>SUMMARY</Box>
                  <Stack spacing={2}>
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Employee Name"
                      value={values.employee_name}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Employee Code"
                      value={values.employee_code}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Email"
                      value={values.email}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Mobile Number"
                      value={values.mobile_number}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Qualification"
                      value={values.qualification_name || values.qualification_id || ''}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Department"
                      value={
                        departmentList.find((item) => item.code === values.department_id)?.name ||
                        ''
                      }
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Designation"
                      value={
                        designationList.find((item) => item.code === values.designation_id)?.name ||
                        ''
                      }
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Bank Name"
                      value={values.employee_bank_name}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Account Number"
                      value={values.account_number}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="Aadhar Number"
                      value={values.aadhar_number}
                      InputProps={{ readOnly: true }}
                    />
                    <DNBTextField
                      fullWidth
                      size="small"
                      label="PAN Number"
                      value={values.pan_number}
                      InputProps={{ readOnly: true }}
                    />
                  </Stack>
                </Box>
              )}

              {/* STEP 6 — Review & Submit */}
              {tab === 5 && (
                <Box>
                  <Box sx={{ fontSize: 11, mb: 2, fontWeight: 700 }}>REVIEW & SUBMIT</Box>
                  <Box sx={{ p: 3, bgcolor: '#f5f7f6', borderRadius: '12px' }}>
                    <Box sx={{ fontWeight: 700, mb: 2 }}>
                      Please review all details before submitting
                    </Box>
                    <Box sx={{ mb: 1 }}>Name: {values.employee_name}</Box>
                    <Box sx={{ mb: 1 }}>Employee Code: {values.employee_code}</Box>
                    <Box sx={{ mb: 1 }}>Email: {values.email}</Box>
                    <Box sx={{ mb: 1 }}>Mobile: {values.mobile_number}</Box>
                    <Box sx={{ mb: 1 }}>
                      Qualification:{' '}
                      {values.qualification_name || values.qualification_id || 'Not provided'}
                    </Box>
                    <Box sx={{ mb: 1 }}>University: {values.university || 'Not provided'}</Box>
                    <Box sx={{ mb: 1 }}>
                      Year of Passing: {values.year_of_passing || 'Not provided'}
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      Department:{' '}
                      {departmentList.find((item) => item.code === values.department_id)?.name ||
                        'Not selected'}
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      Designation:{' '}
                      {designationList.find((item) => item.code === values.designation_id)?.name ||
                        'Not selected'}
                    </Box>
                    <Box sx={{ mb: 1 }}>Bank: {values.employee_bank_name || 'Not provided'}</Box>
                    <Box sx={{ mb: 1 }}>IFSC Code: {values.ifsc_code || 'Not provided'}</Box>
                    <Box sx={{ mb: 1 }}>
                      Aadhar Number: {values.aadhar_number || 'Not provided'}
                    </Box>
                    <Box sx={{ mb: 1 }}>PAN Number: {values.pan_number || 'Not provided'}</Box>
                    <Box sx={{ mb: 1 }}>
                      Profile Image: {values.upload_profile_image ? 'Uploaded ✅' : 'Not uploaded'}
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      Aadhar Card: {values.upload_aadhar_card ? 'Uploaded ✅' : 'Not uploaded'}
                    </Box>
                    <Box>PAN Card: {values.upload_pan_card ? 'Uploaded ✅' : 'Not uploaded'}</Box>
                  </Box>
                </Box>
              )}

              {/* NAVIGATION BUTTONS */}
              <Box display="flex" justifyContent={tab === 0 ? 'flex-end' : 'space-between'} mt={4}>
                <Button
                  onClick={handleBack}
                  sx={{
                    display: tab === 0 ? 'none' : 'block',
                    bgcolor: '#4f46e5',
                    color: '#fff',
                    px: 5,
                    py: 1,
                    borderRadius: '20px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#000000' },
                  }}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={tab === 5 ? () => handleSubmit() : handleNext} // ✅ arrow fn fixes type error
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    bgcolor: '#4f46e5',
                    px: 5,
                    py: 1,
                    borderRadius: '20px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#000000' },
                  }}
                >
                  {tab === 5 ? (isSubmitting ? 'Submitting...' : 'Finish') : 'Next'}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default memo(AddStaffCreation);
