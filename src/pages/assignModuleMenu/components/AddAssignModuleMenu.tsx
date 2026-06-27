// AddAssignModuleMenu

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssignModuleMenuActions } from 'src/apiActions/useAssignModuleMenuActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import useAssignModuleMenuForm from 'src/forms/app/useAssignModuleMenuForm';
import { AddIcon, CancelIcon } from "src/icons/icons";
import { IAssignModuleMenu } from 'src/interface/assignModuleMenu.types';
import { useFetchMenu } from 'src/queries/useFetchMenu';
import { useFetchModule } from 'src/queries/useFetchModule';
import { useFetchPlan } from 'src/queries/useFetchPlan';

interface AddMenuProps {
  open: boolean;
  handleClose: () => void;
  editingAssign?: IAssignModuleMenu | null;
  refetch?: () => void;
}

function AddAssignModuleMenu({ open, handleClose, editingAssign, }: AddMenuProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useAssignModuleMenuActions();
  const { data: plan } = useFetchPlan({ page: 1, search: "" },);
  const { data: menu } = useFetchMenu({ page: 1, search: "" },);
  const { data: module } = useFetchModule({ page: 1, search: "" },);

  const planList = useMemo(
    () =>
      plan?.data?.plans?.map((item: any) => ({
        code: item.plan_id,
        name: item.plan_name,
      })) || [],
    [plan],
  );
  const menuList = useMemo(
    () =>
      menu?.data?.menus?.map((item: any) => ({
        code: item.menu_id,
        name: item.menu_name,
      })) || [],
    [menu],
  );
  const moduleList = useMemo(
    () =>
      module?.data?.modules?.map((item: any) => ({
        code: item.module_id,
        name: item.module_name,
      })) || [],
    [module],
  );


  const isEdit = Boolean(editingAssign);

  const onSubmit = async (values: IAssignModuleMenu) => {
    if (isEdit) {
      await tryUpdate(String(editingAssign?.plan_id ?? ""), values);
    } else {
      await tryAdd(values);
    }
    resetForm();
    handleClose();
  };


  // ✅ formik init
  const formik = useAssignModuleMenuForm(onSubmit)

  const {
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
    if (editingAssign) {
      setValues({
        plan_id: editingAssign.plan_id ?? 0,
        module_ids: editingAssign.module_ids?.map((m: any) => m.module_id) ?? [],
        menu_ids: editingAssign.menu_ids?.map((m: any) => m.menu_id) ?? [],
      });
    } else {
      resetForm();
    }
  }, [editingAssign]);



  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{
      sx: {
        borderRadius: '12px',
        width: '100%'
      },
    }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t("Edit Assign") : t("Add Assign")}
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
            <Stack spacing={2}>
              <Box flex={1}>
                <CustomFormLabel sx={{ color: '#000' }}>
                  {t("Plan Name")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
                  options={planList || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    planList.find((opt: any) => Number(opt.code) === Number(values.plan_id)) || null
                  }
                  onChange={(_, newValue) => {
                    setFieldValue("plan_id", newValue?.code || 0); // ✅ use number
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Plan"
                      size="small"
                      helperText={(touched.plan_id && errors.plan_id) || ""}
                      error={touched.plan_id && Boolean(errors.plan_id)}
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
                  {t("Module Name")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  multiple
                  options={moduleList || []}
                  getOptionLabel={(option) => option.name}
                  value={moduleList.filter((opt: any) =>
                    values.module_ids.includes(opt.code) // now works, both numbers
                  )}
                  onChange={(_, newValue) => {
                    setFieldValue(
                      "module_ids",
                      newValue.map((item: any) => item.code)
                    );
                  }}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Modules"
                      size="small"
                      helperText={(touched.module_ids && errors.module_ids) || ""}
                      error={touched.module_ids && Boolean(errors.module_ids)}
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
                  {t("Menu Name")} <span style={{ color: 'red' }}>*</span>
                </CustomFormLabel>
                <Autocomplete
                  multiple
                  sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
                  options={menuList || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    menuList.filter((opt: any) =>
                      values.menu_ids.includes(opt.code)
                    )
                  }
                  onChange={(_, newValue) => {
                    setFieldValue(
                      "menu_ids",
                      newValue.map((item: any) => item.code)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Menus"
                      size="small"
                      helperText={(touched.menu_ids && errors.menu_ids) || ""}
                      error={touched.menu_ids && Boolean(errors.menu_ids)}
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
    </Dialog>
  );
}

export default memo(AddAssignModuleMenu);