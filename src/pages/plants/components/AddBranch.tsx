import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBranchActions } from 'src/apiActions/useBranchActions';
import { useUploadImageActions } from 'src/apiActions/useUploadImageActions';
import CityAutocomplete from 'src/components/GoogleLocation/CityAutocomplete';
import StateAutocomplete from 'src/components/GoogleLocation/StateAutocomplete';
import Slider from 'src/components/PopupModals/Slider';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useBranchForm from 'src/forms/app/useBranchForm';
import { AddIcon, CancelIcon, CloseIcon, Person } from "src/icons/icons";
import { IBranch } from 'src/interface/branch.types';
import { useFetchCompany } from 'src/queries/useFetchCompany';

interface AddHospitalProps {
  open: boolean;
  handleClose: () => void;
  editingBranch?: IBranch | null;
  refetch?: () => void;
}

function AddBranch({ open, handleClose, editingBranch, }: AddHospitalProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useBranchActions();
  const { data: bank } = useFetchCompany({ page: 1, search: "" },);
  const { tryUploadImage } = useUploadImageActions();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    try {
      setUploading(true);

      const res: any = await tryUploadImage({ file });


      setPreviewUrl(res?.image_url);

      setFieldValue("branch_logo", res?.unique_id);

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

  const bankList = useMemo(
    () =>
      bank?.data?.banks?.map((item: any) => ({
        code: item.company_id,
        name: item.bank_name,
      })) || [],
    [bank]
  );

  const isEdit = Boolean(editingBranch);

  const onSubmit = async (values: IBranch) => {
    if (isEdit) {
      await tryUpdate(editingBranch?.plan_id || "", values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };


  //  formik init

  const formik = useBranchForm(onSubmit)

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
    if (editingBranch) {
      setValues({
        plan_id: editingBranch.plan_id || "",
        company_id: editingBranch.company_id || 0,
        branch_name: editingBranch.branch_name || "",
        branch_code: editingBranch.branch_code || "",
        email: editingBranch.email || "",
        password: editingBranch.password || "",
        address1: editingBranch.address1 || "",
        address2: editingBranch.address2 || "",
        city: editingBranch.city || "",
        state: editingBranch.state || "",
        country: editingBranch.country || "",
        pincode: editingBranch.pincode || "",
        GST_number: editingBranch.GST_number || "",
        pan_number: editingBranch.pan_number || "",
        registration_number: editingBranch.registration_number || "",
        branch_logo: editingBranch.branch_logo || "",
      });
    } else {
      resetForm();
    }
  }, [editingBranch, open]);



  return (
    <Slider open={open} size="md" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t("Edit Plants") : t("Add Plants")}
          <IconButton
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#fff",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                transform: "scale(1.1)",
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* Preview */}
              <Box sx={{ position: "relative" }}>
                {values.branch_logo || imageFile ? (
                  <Box
                    component="img"
                    src={
                      previewUrl
                        ? previewUrl
                        : values.branch_logo
                          ? values.branch_logo
                          : "/default-avatar.png"
                    }
                    alt="Profile Preview"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                      mb: 1,
                      border: "2px solid #ccc",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1,
                      bgcolor: "primary.main",
                      fontSize: 40,
                      border: "2px solid #ccc",
                    }}
                  >
                    <Person sx={{ fontSize: 50 }} />
                  </Avatar>
                )}

                {/* Remove */}
                {(values.branch_logo || imageFile) && (
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setPreviewUrl(null);
                      setFieldValue("branch_logo", null);
                    }}
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      width: 22,
                      height: 22,
                      bgcolor: "error.main",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <CloseIcon sx={{ color: "#fff", fontSize: 14 }} />
                  </Box>
                )}
              </Box>

              {/* Upload Button */}
              <Button
                variant="outlined"
                component="label"
                size="small"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : t("Select Image")}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Branch Name")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.branch_name && !!errors.branch_name}
                  helperText={(touched.branch_name && errors.branch_name) || ""}
                  id="branch_name"
                  placeholder="Enter branch name"
                  value={values.branch_name}
                  onBlur={handleBlur("branch_name")}
                  onChange={handleChange("branch_name")}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Branch Code")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.branch_code && !!errors.branch_code}
                  helperText={(touched.branch_code && errors.branch_code) || ""}
                  id="branch_code"
                  placeholder="Enter branch code"
                  value={values.branch_code}
                  onBlur={handleBlur("branch_code")}
                  onChange={handleChange("branch_code")}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Bank Name")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
                  options={bankList || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    bankList.find((opt: any) => opt.code === values.company_id) || null
                  }
                  onChange={(_, newValue) => {
                    setFieldValue("company_id", newValue?.code || "");
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      placeholder="Select Bank"
                      size="small"
                      helperText={(touched.company_id && errors.company_id) || ""}
                      error={touched.company_id && Boolean(errors.company_id)}
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "0px 8px",
                          minHeight: "43px",
                        },
                        "& .MuiInputBase-input": {
                          padding: "8px 0px",
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
                  {t("Registration Number")}
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.registration_number && !!errors.registration_number}
                  helperText={(touched.registration_number && errors.registration_number) || ""}
                  id="registration_number"
                  placeholder="Enter registration number"
                  value={values.registration_number}
                  onBlur={handleBlur("registration_number")}
                  onChange={handleChange("registration_number")}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Email")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.email && !!errors.email}
                  helperText={(touched.email && errors.email) || ""}
                  id="email"
                  placeholder="Enter email"
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChange={handleChange("email")}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Password")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.password && !!errors.password}
                  helperText={(touched.password && errors.password) || ""}
                  id="password"
                  placeholder="Enter password"
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Country")}
                </CustomFormLabel>

                <Autocomplete
                  sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
                  options={[{ label: "India", value: "India" }]}

                  getOptionLabel={(option) => option.label}

                  value={
                    values.country
                      ? { label: values.country, value: values.country }
                      : null
                  }

                  onChange={(_, newValue) => {
                    setFieldValue("country", newValue?.value || "");
                  }}

                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Country"
                      size="small"
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "0px 8px",
                          minHeight: "43px",
                        },
                        "& .MuiInputBase-input": {
                          padding: "8px 0px",
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("State")}
                </CustomFormLabel>
                <StateAutocomplete
                  country={values.country}
                  value={values.state}
                  onChange={(val) => {
                    setFieldValue("state", val);
                    setFieldValue("city", "");
                  }}
                  error={touched.state && Boolean(errors.state)}
                  helperText={(touched.state && errors.state) || ""}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("City")}
                </CustomFormLabel>
                <CityAutocomplete
                  state={values.state}
                  value={values.city}
                  onChange={(val) => setFieldValue("city", val)}
                  error={touched.city && Boolean(errors.city)}
                  helperText={(touched.city && errors.city) || ""}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("PinCode")}
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.pincode && !!errors.pincode}
                  helperText={(touched.pincode && errors.pincode) || ""}
                  id="pincode"
                  placeholder="Enter pin code"
                  value={values.pincode}
                  onBlur={handleBlur("pincode")}
                  onChange={handleChange("pincode")}
                />
              </Box>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("GST Number")}
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.GST_number && !!errors.GST_number}
                  helperText={(touched.GST_number && errors.GST_number) || ""}
                  id="GST_number"
                  placeholder="Enter GST number"
                  value={values.GST_number}
                  onBlur={handleBlur("GST_number")}
                  onChange={handleChange("GST_number")}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Pan Number")}
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.pan_number && !!errors.pan_number}
                  helperText={(touched.pan_number && errors.pan_number) || ""}
                  id="pan_number"
                  placeholder="Enter pan number"
                  value={values.pan_number}
                  onBlur={handleBlur("pan_number")}
                  onChange={handleChange("pan_number")}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t("Address 1")}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={5}
                  error={!!touched.address1 && !!errors.address1}
                  helperText={(touched.address1 && errors.address1) || ""}
                  id="address1"
                  placeholder="Enter address 1"
                  value={values.address1}
                  onBlur={handleBlur("address1")}
                  onChange={handleChange("address1")}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>{t("Address 2")}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={5}
                  error={!!touched.address2 && !!errors.address2}
                  helperText={(touched.address2 && errors.address2) || ""}
                  id="address2"
                  placeholder="Enter address 2"
                  value={values.address2}
                  onBlur={handleBlur("address2")}
                  onChange={handleChange("address2")}
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
                  backgroundColor: "#4f46e5",
                  "&:hover": {
                    backgroundColor: "#4f46e5",
                  },
                }}
                disabled={isSubmitting}
              >
                {isEdit ? t("Update") : t("Submit")}
              </Button>
              <Button
                color="error"
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={handleClose}
                sx={{ minWidth: 120 }}
              >
                {t("Close")}
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </form>
    </Slider>
  );
}

export default memo(AddBranch);
