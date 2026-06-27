import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack
} from '@mui/material';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoleActions } from 'src/apiActions/useRoleActions';
import Slider from 'src/components/PopupModals/Slider';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useRoleForm from 'src/forms/app/useRoleForm';
import { AddIcon, CancelIcon } from 'src/icons/icons';
import { IRole } from 'src/interface/role.types';

interface AddUserProps {
  open: boolean;
  handleClose: () => void;
  editingRole?: IRole | null;
  refetch?: () => void;
}

function AddRole({ open, handleClose, editingRole, }: AddUserProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useRoleActions();

  const isEdit = Boolean(editingRole);

  const onSubmit = async (values: IRole) => {
    if (isEdit) {
      await tryUpdate(editingRole?.role_id || "", values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };


  //  formik init

  const formik = useRoleForm(onSubmit)

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
    if (editingRole) {
      setValues({
        role: editingRole.role || "",
      });
    } else {
      resetForm();
    }
  }, [editingRole, open]);

  return (
    <Slider open={open} size="xs" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t("Edit Role") : t("Add Role")}
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
            }} onClick={handleClose}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Box flex={1}>
              <CustomFormLabel sx={{ color: '#000' }}>
                {t("Role Name")} <span style={{ color: 'red' }}>*</span>
              </CustomFormLabel>
              <CustomTextField
                fullWidth
                error={!!touched.role && !!errors.role}
                helperText={(touched.role && errors.role) || ""}
                id="role"
                placeholder="Enter role name"
                value={values.role}
                onBlur={handleBlur("role")}
                onChange={handleChange("role")}
              />
            </Box>

            {/* Actions */}
            <Stack direction="row" justifyContent="start" spacing={2}>
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

export default memo(AddRole);
