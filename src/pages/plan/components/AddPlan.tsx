import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack
} from '@mui/material';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePlanActions } from 'src/apiActions/usePlanActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import usePlanForm from 'src/forms/app/usePlanForm';
import { AddIcon, CancelIcon } from "src/icons/icons";
import { IPlan } from 'src/interface/plan.types';

interface AddUserProps {
  open: boolean;
  handleClose: () => void;
  editingPlan?: IPlan | null;
  refetch?: () => void;
}

function AddPlan({ open, handleClose, editingPlan, }: AddUserProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = usePlanActions();

  const isEdit = Boolean(editingPlan);

  const onSubmit = async (values: IPlan) => {
    if (isEdit) {
      await tryUpdate(editingPlan?.plan_id || "", values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };


  //  formik init

  const formik = usePlanForm(onSubmit)

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    // setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
    setValues,
  } = formik;

  useEffect(() => {
    if (editingPlan) {
      setValues({
        plan_name: editingPlan.plan_name || "",
        plan_price: editingPlan.plan_price || 0,
        plan_description: editingPlan.plan_description || "",
      });
    } else {
      resetForm();
    }
  }, [editingPlan, open]);



  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{
      sx: {
        borderRadius: '12px',
        overflow: 'hidden',
        width: '100%'
      },
    }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>{isEdit ? t("Edit Plan") : t("Add Plan")}
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
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t(" PlanName")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  error={!!touched.plan_name && !!errors.plan_name}
                  helperText={(touched.plan_name && errors.plan_name) || ""}
                  id="plan_name"
                  placeholder="Enter plan name"
                  value={values.plan_name}
                  onBlur={handleBlur("plan_name")}
                  onChange={handleChange("plan_name")}
                />
              </Box>

              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Plan Price")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <CustomTextField
                  fullWidth
                  type="number"
                  error={!!touched.plan_price && !!errors.plan_price}
                  helperText={(touched.plan_price && errors.plan_price) || ""}
                  id="plan_price"
                  placeholder="Enter plan price"
                  value={values.plan_price}
                  onBlur={handleBlur("plan_price")}
                  onChange={handleChange("plan_price")}
                />
              </Box>
            </Stack>
            <Stack spacing={2} pt={1}>
              <Box width="100%">
                <CustomFormLabel sx={{ color: '#000' }}>{t("Plan Description")}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={5}
                  error={!!touched.plan_description && !!errors.plan_description}
                  helperText={(touched.plan_description && errors.plan_description) || ""}
                  id="plan_description"
                  placeholder="Enter plan description"
                  value={values.plan_description}
                  onBlur={handleBlur("plan_description")}
                  onChange={handleChange("plan_description")}
                />
              </Box>


              {/* Actions */}
              <Stack direction="row" justifyContent="center" spacing={2}>
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
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default memo(AddPlan);
