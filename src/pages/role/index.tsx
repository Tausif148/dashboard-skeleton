import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { useRoleActions } from 'src/apiActions/useRoleActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { AddIcon, CloseIcon, GroupIcon, ListAltIcon, RefreshIcon, SearchIcon, StorageIcon, VerifiedIcon } from "src/icons/icons";
import { useFetchRole } from 'src/queries/useFetchRole';
import AddRole from './components/AddRole';
import RoleTable from './components/RoleTable';


function Index() {
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any | null>(null);

  // pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const alert = useAlert();
  const { data: roleList, refetch, isLoading } = useFetchRole({ page, limit, search });

  const { tryDelete } = useRoleActions();

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

  const handleEditRole = (role: any) => {
    setEditingRole(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRole(null);
  };
  const cardsData = [
    {
      label: "Total Roles",
      value: roleList?.data?.roles?.length || 0,
      icon: <GroupIcon sx={{ color: "#0C447C" }} />, // 👥 Roles / Users
      iconBg: "#B5D4F4",
      bg: "#E6F1FB",
      border: "#B5D4F4",
      labelColor: "#185FA5",
      valueColor: "#0C447C",
    },
    {
      label: "Unique Roles",
      value:
        new Set(roleList?.data?.roles?.map((r: any) => r.role)).size || 0,
      icon: <VerifiedIcon sx={{ color: "#27500A" }} />,
      iconBg: "#4f46e5",
      bg: "#EAF3DE",
      border: "#4f46e5",
      labelColor: "#3B6D11",
      valueColor: "#27500A",
    },
    {
      label: "Total Entries",
      value: roleList?.data?.roles?.length || 0,
      icon: <ListAltIcon sx={{ color: "#791F1F" }} />,
      iconBg: "#F7C1C1",
      bg: "#FCEBEB",
      border: "#F7C1C1",
      labelColor: "#A32D2D",
      valueColor: "#791F1F",
    },
    {
      label: "Records",
      value: roleList?.data?.roles?.length || 0,
      icon: <StorageIcon sx={{ color: "#633806" }} />,
      iconBg: "#FAC775",
      bg: "#FAEEDA",
      border: "#FAC775",
      labelColor: "#854F0B",
      valueColor: "#633806",
    },
  ];
  return (
    <PageContainer title="Role Page" description="Role customized page" >

      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: "10px",
          p: 3,
          border: '1px solid #EEF1F4',
          mb: 3,
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 6, }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Role List</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
                gap: 1,
                alignItems: "center",
                flexWrap: "nowrap",
                overflow: "hidden",
              }}
            >
              {/* Refresh */}
              <IconButton
                aria-label="refresh"
                onClick={() => refetch?.()}
                sx={{ flexShrink: 0 }}
              >
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
                  border: "1px solid #c6cfd8",
                  borderRadius: "8px",
                  height: 40,
                  width: 280,
                  "& fieldset": { border: "none" },
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
                            borderRadius: "30%",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <SearchIcon sx={{ color: "#4f46e5", fontSize: 28, mt: 0.5 }} />
                        </Box>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" color="primary" startIcon={<AddIcon />}
                onClick={() => setOpen(true)} sx={{
                  color: "#fff",
                  fontWeight: 600,
                  px: 2,
                  height: "40px",
                  textTransform: "none",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                  backgroundColor: "#4f46e5",
                  "&:hover": {
                    backgroundColor: "#4f46e5",
                  },
                }}>Add Role</Button>

            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <RoleTable
            roleList={roleList?.data?.roles || []}
            handleDeleteRole={handleDeleteRole}
            handleEditRole={handleEditRole}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            search={search}
            setSearch={setSearch}
            loading={isLoading}
          />
        </Box>
      </Box>

      {/* ✅ AddRole can be reused for edit as well */}
      <AddRole
        handleClose={handleClose}
        open={open}
        editingRole={editingRole} // pass role if editing
      />
    </PageContainer>
  );
}

export default memo(Index);