import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography, } from '@mui/material';
import { memo, useState } from 'react';
import { useAssignRoleActions } from 'src/apiActions/useAssignRoleActions';
import { useAlert } from 'src/components/Alert';
import ColumnVisibility from 'src/components/ColumnVisibility';
import PageContainer from 'src/components/container/PageContainer';
import CountCard from 'src/components/CountCard';
import {
  AddIcon,
  CloseIcon,
  EditIcon,
  MenuIcon,
  RefreshIcon,
  SearchIcon,
  ViewListIcon,
  VisibilityIcon
} from 'src/icons/icons';
import { useFetchAssignRole } from 'src/queries/useFetchAssignRole';
import AddAssignRole from './components/AddAssignRole';
import AssignRoleTable from './components/AssignRoleTable';


function Index() {
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);

  // ✅ pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  // const [toggleLoading, setToggleLoading] = useState<{ [id: string]: boolean }>({});

  const alert = useAlert();
  const { data: roleList, refetch, isLoading } = useFetchAssignRole({ page, limit, search });

  const { tryDelete } = useAssignRoleActions();

  const handleDeleteRole = (id: string) => {
    alert?.show({
      title: "Confirm",
      message: "Do you want to delete this role?",
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const data = roleList?.data || {};
  // Normalize assignments: API may return { assignments: [...] } or a single assignment under data
  const assignments = Array.isArray(data.assignments)
    ? data.assignments
    : Array.isArray(data)
      ? data
      : data.assigned_id
        ? [data]
        : [];

  const handleEditRole = (row: any) => {
    const fullAssignment = assignments.find(
      (a: any) => a.assigned_id === row.assigned_id
    );

    setEditingRole(fullAssignment || null);
    setOpen(true);
  };

  const handleViewRole = (row: any) => {
    const fullAssignment = assignments.find(
      (a: any) => a.assigned_id === row.assigned_id
    );
    setSelectedAssignment(fullAssignment || row);
    setViewOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRole(null); // reset
  };


  const modules = data.assigned_modules || (assignments[0]?.assigned_modules || []);

  // ✅ Total Modules
  const totalModules = modules.length;

  // ✅ Total Menus
  const totalMenus = modules.reduce(
    (sum: number, m: any) => sum + (m.menus?.length || 0),
    0
  );

  // ✅ View Permissions
  const totalView = modules.reduce(
    (sum: number, m: any) =>
      sum + m.menus.filter((menu: any) => menu.is_view).length,
    0
  );

  // ✅ Edit Permissions (add/update/delete)
  const totalEdit = modules.reduce(
    (sum: number, m: any) =>
      sum +
      m.menus.filter(
        (menu: any) => menu.is_add || menu.is_update || menu.is_delete
      ).length,
    0
  );

  const cardsData = [
    {
      label: "Total Modules",
      value: totalModules,
      icon: <ViewListIcon sx={{ color: "#0C447C" }} />, // 📦 modules
      iconBg: "#B5D4F4",
      bg: "#E6F1FB",
      border: "#B5D4F4",
      labelColor: "#185FA5",
      valueColor: "#0C447C",
    },
    {
      label: "Total Menus",
      value: totalMenus,
      icon: <MenuIcon sx={{ color: "#27500A" }} />, // 📋 menus
      iconBg: "#C0DD97",
      bg: "#EAF3DE",
      border: "#C0DD97",
      labelColor: "#3B6D11",
      valueColor: "#27500A",
    },
    {
      label: "View Permissions",
      value: totalView,
      icon: <VisibilityIcon sx={{ color: "#633806" }} />, // 👁 view
      iconBg: "#FAC775",
      bg: "#FAEEDA",
      border: "#FAC775",
      labelColor: "#854F0B",
      valueColor: "#633806",
    },
    {
      label: "Edit Permissions",
      value: totalEdit,
      icon: <EditIcon sx={{ color: "#791F1F" }} />, // ✏️ edit
      iconBg: "#F7C1C1",
      bg: "#FCEBEB",
      border: "#F7C1C1",
      labelColor: "#A32D2D",
      valueColor: "#791F1F",
    },
  ];
  const formattedRoles =
    assignments.flatMap((assignment: any) =>
      (assignment.assigned_modules || []).map((module: any) => ({
        assigned_id: assignment.assigned_id,
        role_id: assignment.role_id,
        role_name: assignment.role,
        module_name: module.module_name,
        menus: module.menus,
      }))
    ) || [];

  const columns = [
    { key: 'sr', label: 'Sr No.', always: true },
    { key: 'role_name', label: 'Role Name', sortable: true },
    { key: 'module_name', label: 'Assigned Module Name', sortable: true },
    { key: 'assigned_menus', label: 'Assigned Menu Name' },
    { key: 'permissions_count', label: 'Permissions' },
    { key: 'actions', label: 'Actions', always: true },
  ];

  const [visible, setVisible] = useState<boolean[]>(() => columns.map(() => true));
  const handleToggleColumn = (index: number) => setVisible((p) => { const n = [...p]; n[index] = !n[index]; return n; });


  return (
    <PageContainer title="Directors" description="Manage directors">
      <CountCard cards={cardsData} />
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          minWidth: 0,
          p: 3,
          // py: 3,
          // px: 3,
          border: '1px solid #EEF1F4',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 4, }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Assign Role List</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <IconButton aria-label="refresh" onClick={() => refetch?.()}>
                <RefreshIcon />
              </IconButton>
              <TextField
                fullWidth
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search..."
                variant="outlined"
                size="small"
                sx={{
                  border: '1px solid #c6cfd8',
                  borderRadius: '8px',
                  height: 40,
                  width: 280,
                  '& fieldset': { border: 'none' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {search ? (
                        // ❌ Close Icon when typing
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSearch('');
                            setPage(1);
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      ) : (
                        // 🔍 Search Icon when empty
                        <Box
                          sx={{
                            borderRadius: '30%',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <SearchIcon sx={{ color: '#4f46e5', fontSize: 28, mt: 0.5 }} />
                        </Box>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" color="primary" startIcon={<AddIcon />}
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  px: 2,
                  height: '40px',
                  textTransform: 'none',
                  borderRadius: '5px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  backgroundColor: '#4f46e5',
                  '&:hover': {
                    backgroundColor: '#4f46e5',
                  },
                }} onClick={() => setOpen(true)}
              >Add Assign Role</Button>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#4f46e5',
                }}
              >
                <ColumnVisibility
                  columns={columns}
                  visible={visible}
                  onToggle={handleToggleColumn}
                />
              </Box>

            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <AssignRoleTable
            roleList={formattedRoles}
            roleName={roleList?.data?.role}
            handleDeleteRole={handleDeleteRole}
            handleEditRole={handleEditRole}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            search={search}
            setSearch={setSearch}
            loading={isLoading}
            visible={visible}
          />
        </Box>
      </Box>

      {/* ✅ AddAssignRole can be reused for edit as well */}
      <AddAssignRole
        handleClose={handleClose}
        open={open}
        editingRole={editingRole} // pass role if editing
        refetch={refetch}
      />
    </PageContainer>
  );
}

export default memo(Index);
