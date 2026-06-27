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
import { useModuleActions } from 'src/apiActions/useModuleActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useModuleForm from 'src/forms/app/useModuleForm';
import { AddIcon, CancelIcon } from "src/icons/icons";
import { IModule } from 'src/interface/module.types';

interface AddUserProps {
  open: boolean;
  handleClose: () => void;
  editingModule?: IModule | null;
  refetch?: () => void;
}

function AddModule({ open, handleClose, editingModule, }: AddUserProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useModuleActions();

  const isEdit = Boolean(editingModule);


  const onSubmit = async (values: IModule) => {
    if (isEdit) {
      await tryUpdate(editingModule?.module_id || "", values);
    } else {
      await tryAdd(values);
    }
    handleClose();
    resetForm();
  };


  // //  formik init

  const formik = useModuleForm(onSubmit)

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
    if (editingModule) {
      setValues({
        module_name: editingModule.module_name || "",
      });
    } else {
      resetForm();
    }
  }, [editingModule, open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{
      sx: {
        borderRadius: '12px',
        overflow: 'hidden',
        width: '100%'
      },
    }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t("Edit Module") : t("Add Module")}
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Box flex={1}>
              <CustomFormLabel sx={{ color: '#000' }}>
                {t("Module Name")} <span style={{ color: 'red' }}>*</span>
              </CustomFormLabel>
              <CustomTextField
                fullWidth
                error={!!touched.module_name && !!errors.module_name}
                helperText={(touched.module_name && errors.module_name) || ""}
                id="module_name"
                placeholder="Enter module name"
                value={values.module_name}
                onBlur={handleBlur("module_name")}
                onChange={handleChange("module_name")}
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
        </DialogContent>
      </form>
    </Dialog >
  );
}

export default memo(AddModule);
