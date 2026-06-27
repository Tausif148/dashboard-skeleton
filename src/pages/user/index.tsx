import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useUserActions } from 'src/apiActions/useUserActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { AddIcon, CloseIcon, RefreshIcon, SearchIcon } from 'src/icons/icons';
import { useFetchUser } from 'src/queries/useFetchUser';
import AddUser from './components/AddUser';
import UserTable from './components/UserTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  //pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();
  const { data, refetch, isLoading } = useFetchUser();
  // console.log('userList', userList);

  const { tryDelete } = useUserActions();

  const handleDeleteUser = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this user?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };


  // Pagination and Search
  const rawUsers: any[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.users)) return data.data.users;
    return [];
  }, [data]);

  // 1. Filter client-side
  const filteredUsers = useMemo(
    () =>
      rawUsers.filter((u: any) =>
        (u.first_name + ' ' + u.last_name).toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
      ),
    [rawUsers, search],
  );

  // 2. Paginate client-side
  const paginatedUsers = useMemo(
    () => filteredUsers.slice((page - 1) * limit, page * limit),
    [filteredUsers, page, limit],
  );
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };


  return (
    <PageContainer title="User Page" description="User customized page">
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          p: 3,
          border: '1px solid #EEF1F4',
          mb: 3,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid
            size={{ xs: 12, sm: 4, md: 3 }}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="h4">User List</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 7, md: 9 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                gap: 1,
                alignItems: 'center',
                flexWrap: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {/* 🔹 LEFT SIDE (Search + Refresh) */}
              <IconButton aria-label="refresh" onClick={() => refetch()} sx={{ flexShrink: 0 }}>
                <RefreshIcon />
              </IconButton>

              <TextField
                fullWidth
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
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
                        <IconButton size="small" onClick={() => handleSearchChange('')}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      ) : (
                        <Box
                          sx={{
                            borderRadius: '30%',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <SearchIcon sx={{ color: '#4f46e5', fontSize: 28, mt: 0.5 }} />
                        </Box>
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              {/* 🔹 RIGHT SIDE (Buttons) */}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
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
                }}
              >
                Add User
              </Button>

              {/* <Button variant="outlined" onClick={handleExportExcel}>
                  Export Excel
                </Button>

                <Button variant="outlined" onClick={handleDownloadPDF}>
                  Download PDF
                </Button>

                <Button variant="outlined" onClick={handlePrintPDF}>
                  Print PDF
                </Button> */}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <UserTable
            userList={paginatedUsers}
            totalCount={filteredUsers.length}
            handleDeleteUser={handleDeleteUser}
            handleEditUser={handleEditUser}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={(l) => { setLimit(l); setPage(1); }}
            loading={isLoading}
          />
        </Box>
      </Box>

      {/* ✅ AddUser can be reused for edit as well */}
      <AddUser
        handleClose={handleClose}
        open={open}
        editingUser={editingUser} // pass user if editing
      />

      <ToastContainer />

    </PageContainer>

  );
}

export default memo(Index);
