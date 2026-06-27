import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { useAssignModuleMenuActions } from 'src/apiActions/useAssignModuleMenuActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { AddIcon, CloseIcon, DashboardIcon, FormatListBulletedIcon, ReceiptLongIcon, RefreshIcon, SearchIcon, ViewModuleIcon } from "src/icons/icons";
import { useFetchAssignModuleMenu } from 'src/queries/useFetchAssignModuleMenu';
import AddAssignModuleMenu from './components/AddAssignModuleMenu';
import AssignModuleMenuTable from './components/AssignModuleMenuTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingAssign, setEditingAssign] = useState<any | null>(null);

  // pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const alert = useAlert();
  const { data: assignList, refetch, isLoading } = useFetchAssignModuleMenu({ page, limit, search });
  console.log("assignList", assignList);

  const { tryDelete } = useAssignModuleMenuActions();

  const handleDeleteAssign = (id: string) => {
    alert?.show({
      title: "Confirm",
      message: "Do you want to delete this assignment?",
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditAssign = (assign: any) => {
    setEditingAssign(assign);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAssign(null);
  };
  const cardsData = [
    {
      label: "Total Assignments",
      value: assignList?.data?.assignments?.length || 0,
      icon: <DashboardIcon sx={{ color: "#0C447C" }} />,
      iconBg: "#B5D4F4",
      bg: "#E6F1FB",
      border: "#B5D4F4",
      labelColor: "#185FA5",
      valueColor: "#0C447C",
    },
    {
      label: "",
      value:
        assignList?.data?.assignments?.reduce(
          (acc: number, curr: any) => acc + (curr.module_ids?.length || 0),
          0
        ) || 0,
      icon: <ViewModuleIcon sx={{ color: "#27500A" }} />,
      iconBg: "#4f46e5",
      bg: "#EAF3DE",
      border: "#4f46e5",
      labelColor: "#3B6D11",
      valueColor: "#27500A",
    },
    {
      label: "Total Menus",
      value:
        assignList?.data?.assignments?.reduce(
          (acc: number, curr: any) => acc + (curr.menu_ids?.length || 0),
          0
        ) || 0,
      icon: <FormatListBulletedIcon sx={{ color: "#791F1F" }} />,
      iconBg: "#F7C1C1",
      bg: "#FCEBEB",
      border: "#F7C1C1",
      labelColor: "#A32D2D",
      valueColor: "#791F1F",
    },
    {
      label: "Total Records",
      value: assignList?.data?.assignments?.length || 0,
      icon: <ReceiptLongIcon sx={{ color: "#633806" }} />,
      iconBg: "#FAC775",
      bg: "#FAEEDA",
      border: "#FAC775",
      labelColor: "#854F0B",
      valueColor: "#633806",
    },
  ];
  return (
    <PageContainer title="Assign Page" description="Assign customized page" >

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
          <Grid size={{ xs: 12, md: 6, }} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Assign List</Typography>
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
                onClick={() => setOpen(true)}
                sx={{
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
                }}
              >Add Assign</Button>

            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <AssignModuleMenuTable
            assignList={assignList?.data?.assignments || []}
            handleDeleteAssign={handleDeleteAssign}
            handleEditAssign={handleEditAssign}
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

      {/* ✅ AddUser can be reused for edit as well */}
      <AddAssignModuleMenu
        handleClose={handleClose}
        open={open}
        editingAssign={editingAssign} // pass assignment if editing
      />
    </PageContainer>
  );
}

export default memo(Index);