import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssignRoleActions } from 'src/apiActions/useAssignRoleActions';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import useAssignRoleForm from 'src/forms/app/useAssignRoleForm';
import useDecoded from 'src/hooks/useDecoded';
import { IAssignRole } from 'src/interface/assignRole.type';
import { useFetchMenu } from 'src/queries/useFetchMenu';
import { useFetchModule } from 'src/queries/useFetchModule';
import { useFetchRole } from 'src/queries/useFetchRole';

interface AddUserProps {
  open: boolean;
  handleClose: () => void;
  editingRole?: IAssignRole | null;
  refetch?: () => Promise<unknown> | void;
}

function AddAssignRole({ open, handleClose, editingRole, refetch }: AddUserProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useAssignRoleActions();
  const { data: role } = useFetchRole({ page: 1, search: "" },);

  const roleList = useMemo(
    () =>
      role?.data?.roles?.map((item: any) => ({
        code: item.role_id,
        name: item.role,
      })) || [],
    [role],
  );


  // Fetch modules and menus
  const { data: moduleData } = useFetchModule({ page: 1, limit: 100 });
  const { data: menuData } = useFetchMenu({ page: 1, limit: 100 });
  const modules = Array.isArray(moduleData?.data?.modules) ? moduleData.data.modules : [];
  const menus = Array.isArray(menuData?.data?.menus) ? menuData.data.menus : [];
  const { company_id } = useDecoded();

  const isEdit = Boolean(editingRole);

  const onSubmit = async (values: IAssignRole) => {
    if (isEdit) {
      await tryUpdate(editingRole?.assigned_id ?? "", values);
    } else {
      await tryAdd(values);
    }

    await refetch?.();
    resetForm();
    handleClose();
  };


  // ✅ formik init
  // Get the full user object from localStorage
  let userObj: any = null;
  if (typeof window !== 'undefined') {
    try {
      userObj = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      userObj = {};
    }
  }
  const assignedModules = userObj?.branch?.assigned_modules || [];
  console.log("Assigned Modules for current user:", assignedModules);

  const initialFormValues = useMemo(() => {
    if (isEdit && editingRole) {
      return {
        company_id: editingRole.company_id ?? company_id ?? 0,
        role_id: editingRole.role_id ?? 0,
        plan_id: editingRole.plan_id ?? 0,
        assigned_modules:
          editingRole.assigned_modules?.map((m: any) => Number(m.module_id)) || [],
        assigned_menus:
          editingRole.assigned_modules?.flatMap((m: any) =>
            m.menus?.map((menu: any) => ({
              menu_id: Number(menu.menu_id),
              is_add: menu.is_add,
              is_update: menu.is_update,
              is_delete: menu.is_delete,
              is_view: menu.is_view,
            }))
          ) || [],
      };
    }
    return {
      role_id: 0,
      company_id: company_id ?? 0,
      plan_id: 0,
      assigned_modules: [],
      assigned_menus: [],
    };
  }, [editingRole, isEdit, company_id]);

  const formik = useAssignRoleForm(onSubmit, initialFormValues as IAssignRole);

  const {
    // handleBlur,
    // handleChange,
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
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t("Edit Assign Role") : t("Add Assign Role")}
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
            }} onClick={handleClose}
          >
            <CancelIcon sx={{ color: '#fff' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Box flex={1}>
              <CustomFormLabel sx={{ color: '#000' }}>
                {t("Role")} <span style={{ color: 'red' }}>*</span>
              </CustomFormLabel>
              <Autocomplete
                sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
                options={roleList || []}
                getOptionLabel={(option) => option.name}
                value={
                  roleList.find((opt: any) => Number(opt.code) === Number(values.role_id)) || null
                }
                onChange={(_, newValue) => {
                  setFieldValue("role_id", newValue?.code || 0); // ✅ use number
                  // Clear previous module/menu selections when role changes
                  setFieldValue("assigned_modules", []);
                  setFieldValue("assigned_menus", []);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t("Select Role")}
                    size="small"
                    helperText={(touched.role_id && errors.role_id) || ""}
                    error={touched.role_id && Boolean(errors.role_id)}
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
                {t("Assign Modules")} <span style={{ color: 'red' }}>*</span>
              </CustomFormLabel>
              <Autocomplete
                multiple
                options={modules}
                getOptionLabel={(option) => option.module_name}
                value={Array.isArray(values.assigned_modules) ? modules.filter((m: any) => values.assigned_modules.includes(Number(m.module_id))) : []}
                onChange={(_, newValue) => {
                  setFieldValue('assigned_modules', newValue.map((m: any) => Number(m.module_id)));
                  // Remove menus not in selected modules
                  const allowedMenuIds = menus.filter((menu: any) => newValue.some((mod: any) => Number(mod.module_id) === Number(menu.module_id))).map((m: any) => Number(m.menu_id));
                  setFieldValue('assigned_menus', Array.isArray(values.assigned_menus) ? values.assigned_menus.filter((am: any) => allowedMenuIds.includes(am.menu_id)) : []);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder={t("Select Modules")} size="small" />
                )}
                sx={{ backgroundColor: '#fff', borderRadius: '7px', mb: 2 }}
              />

              <CustomFormLabel sx={{ color: '#000' }}>
                {t("Assign Menus")} <span style={{ color: 'red' }}>*</span>
              </CustomFormLabel>
              <Autocomplete
                multiple
                options={menus.filter((menu: any) => Array.isArray(values.assigned_modules) && values.assigned_modules.includes(Number(menu.module_id)))}
                getOptionLabel={(option) => option.menu_name}
                value={Array.isArray(values.assigned_menus) ? menus.filter((menu: any) => values.assigned_menus.some((am: any) => Number(am.menu_id) === Number(menu.menu_id))) : []}
                onChange={(_, newValue) => {
                  // Add new menus with default permissions, keep existing ones
                  const updatedMenus = newValue.map((menu: any) => {
                    const existing = Array.isArray(values.assigned_menus) ? values.assigned_menus.find((am: any) => Number(am.menu_id) === Number(menu.menu_id)) : undefined;
                    return existing || { menu_id: Number(menu.menu_id), is_add: 0, is_update: 0, is_delete: 0, is_view: 0 };
                  });
                  setFieldValue('assigned_menus', updatedMenus);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder={t("Select Menus")} size="small" />
                )}
                sx={{ backgroundColor: '#fff', borderRadius: '7px', mb: 2 }}
              />

              {/* Permissions for each selected menu */}
              {Array.isArray(values.assigned_menus) && values.assigned_menus.length > 0 && (
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    p: 2,
                    height: "250px", // ✅ fixed height
                    overflowY: "auto", // ✅ vertical scroll
                    border: "1px solid #E5E7EB",
                  }}
                >
                  {values.assigned_menus.map((am: any) => {
                    const menu = menus.find(
                      (m: any) => Number(m.menu_id) === Number(am.menu_id)
                    );
                    if (!menu) return null;

                    return (
                      <Box
                        key={am.menu_id}
                        sx={{
                          mb: 2,
                          p: 1.5,
                          borderRadius: "8px",
                          border: "1px solid #F1F5F9",
                          background: "#FAFAFA",
                        }}
                      >
                        {/* Menu Name */}
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#1976d2",
                            mb: 1,
                            fontSize: "0.9rem",
                          }}
                        >
                          {menu.menu_name}
                        </Typography>

                        {/* Actions */}
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!am.is_add}
                                onChange={(_, checked) => {
                                  setFieldValue(
                                    "assigned_menus",
                                    values.assigned_menus.map((item: any) =>
                                      item.menu_id === am.menu_id
                                        ? { ...item, is_add: checked ? 1 : 0 }
                                        : item
                                    )
                                  );
                                }}
                              />
                            }
                            label="Add"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!am.is_update}
                                onChange={(_, checked) => {
                                  setFieldValue(
                                    "assigned_menus",
                                    values.assigned_menus.map((item: any) =>
                                      item.menu_id === am.menu_id
                                        ? { ...item, is_update: checked ? 1 : 0 }
                                        : item
                                    )
                                  );
                                }}
                              />
                            }
                            label="Update"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!am.is_delete}
                                onChange={(_, checked) => {
                                  setFieldValue(
                                    "assigned_menus",
                                    values.assigned_menus.map((item: any) =>
                                      item.menu_id === am.menu_id
                                        ? { ...item, is_delete: checked ? 1 : 0 }
                                        : item
                                    )
                                  );
                                }}
                              />
                            }
                            label="Delete"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!am.is_view}
                                onChange={(_, checked) => {
                                  setFieldValue(
                                    "assigned_menus",
                                    values.assigned_menus.map((item: any) =>
                                      item.menu_id === am.menu_id
                                        ? { ...item, is_view: checked ? 1 : 0 }
                                        : item
                                    )
                                  );
                                }}
                              />
                            }
                            label="View"
                          />
                        </Stack>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
            {/* <Box flex={1}>
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
            </Box> */}
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

export default memo(AddAssignRole);
