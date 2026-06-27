import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Autocomplete,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssignStaffActions } from 'src/apiActions/useAssignStaffActions';
import Slider from 'src/components/PopupModals/Slider';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import useAssignStaffForm from 'src/forms/app/useAssignStaffForm';
import useDecoded from 'src/hooks/useDecoded';
import { IAssignStaff } from 'src/interface/assignStaff.type';
import { useFetchRole } from 'src/queries/useFetchRole';
import { useFetchStaffCreation } from 'src/queries/useFetchStaffCreation';

interface AddUserProps {
  open: boolean;
  handleClose: () => void;
  editingStaff?: IAssignStaff | null;
  refetch?: () => Promise<unknown> | void;
}

function AddAssignStaff({ open, handleClose, editingStaff, refetch }: AddUserProps) {
  const { t } = useTranslation();
  const { tryAdd, tryUpdate } = useAssignStaffActions();
  const { data: role } = useFetchRole({ page: 1, search: "" },);
  const { data: staff } = useFetchStaffCreation({ page: 1, search: "" },);

  const roleList = useMemo(
    () =>
      role?.data?.roles?.map((item: any) => ({
        code: item.role_id,
        name: item.role,
      })) || [],
    [role],
  );

  const staffList = useMemo(
    () =>
      staff?.data?.manpower?.map((item: any) => ({
        code: item.employee_id,
        name: item.employee_name,
      })) || [],
    [staff],
  );

  const isEdit = Boolean(editingStaff);

  const onSubmit = async (values: IAssignStaff) => {
    if (isEdit) {
      await tryUpdate(String(editingStaff?.assigned_role_id ?? ""), values);
    } else {
      await tryAdd(values);
    }

    await refetch?.();
    resetForm();
    handleClose();
  };


  // ✅ formik init
  const { company_id } = useDecoded();
  const formik = useAssignStaffForm(onSubmit, { company_id: company_id } as unknown as IAssignStaff)

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
    if (editingStaff) {
      setValues({
        company_id: editingStaff.company_id ?? 0,
        role_id: editingStaff.role_id ?? 0,
        employee_id: editingStaff.employee_id ?? 0,
      });
    } else {
      resetForm();
    }
  }, [editingStaff, open]);

  // Ensure assigned modules/menus are available in form values when editing
  // useEffect(() => {
  //   if (editingStaff && editingStaff.assigned_modules) {
  //     setFieldValue('assigned_modules', editingStaff.assigned_modules.map((m: any) => Number(m.module_id)));
  //   }
  //   if (editingStaff && editingStaff.assigned_menus) {
  //     setFieldValue('assigned_menus', editingStaff.assigned_menus.map((mm: any) => ({
  //       menu_id: Number(mm.menu_id),
  //       is_add: mm.is_add,
  //       is_update: mm.is_update,
  //       is_delete: mm.is_delete,
  //       is_view: mm.is_view,
  //     })));
  //   }
  // }, [editingStaff]);

  return (
    <Slider open={open} size="xs" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, bgcolor: '#4f46e5', color: '#fff' }}>
          {isEdit ? t("Edit Assign Staff") : t("Add Assign Staff")}
          <IconButton
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
            onClick={handleClose}
          >
            <CancelIcon sx={{ color: '#fff' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Box flex={1}>
              <CustomFormLabel>
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
                  setFieldValue("role_id", newValue?.code || 0);
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
              <CustomFormLabel>
                {t("Employee Name")} <span style={{ color: 'red' }}>*</span>
              </CustomFormLabel>
              <Autocomplete
                sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
                options={staffList || []}
                getOptionLabel={(option) => option.name}
                value={
                  staffList.find((opt: any) => Number(opt.code) === Number(values.employee_id))
                  || (editingStaff ? { code: editingStaff.employee_id, name: editingStaff.employee_name } : null)
                }
                onChange={(_, newValue) => {
                  setFieldValue("employee_id", newValue?.code || 0); // ✅ use number
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t("Select Employee")}
                    size="small"
                    helperText={(touched.employee_id && errors.employee_id) || ""}
                    error={touched.employee_id && Boolean(errors.employee_id)}
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

            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ minWidth: 120, }}
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

export default memo(AddAssignStaff);
