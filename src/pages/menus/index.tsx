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
import { useMenuActions } from 'src/apiActions/useMenuActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import {
  AddIcon,
  CloseIcon,
  RefreshIcon,
  SearchIcon
} from 'src/icons/icons';
import { useFetchMenu } from 'src/queries/useFetchMenu';
import AddMenu from './components/AddMenu';
import MenuTable from './components/MenuTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<any | null>(null);

  //pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();
  const { data, refetch, isLoading } = useFetchMenu();
  console.log('menuList', data);

  const { tryDelete } = useMenuActions();

  const handleDeleteMenu = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this menu?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditMenu = (menu: any) => {
    setEditingMenu(menu);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMenu(null);
  };

  // Pagination and Search Logic
  const rawMenus: any[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.menus)) return data.data.menus;
    return [];
  }, [data]);

  const filteredMenus = useMemo(
    () =>
      rawMenus.filter(
        (m: any) =>
          m.menu_name.toLowerCase().includes(search.toLowerCase()) ||
          m.module_name.toLowerCase().includes(search.toLowerCase()),
      ),
    [rawMenus, search],
  );

  const paginatedMenus = useMemo(
    () => filteredMenus.slice((page - 1) * limit, page * limit),
    [filteredMenus, page, limit],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };


  return (
    <PageContainer title="Menu Page" description="Menu customized page">
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          p: 3,
          border: '1px solid #EEF1F4',
          mb: 3,
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Menu List</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
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
              <IconButton aria-label="refresh" onClick={() => refetch?.()} sx={{ flexShrink: 0 }}>
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
                        // ❌ Close Icon when typing
                        <IconButton size="small" onClick={() => handleSearchChange('')}>
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
              <Button
                variant="contained"
                color="primary"
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
                Add Menu
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <MenuTable
            menuList={paginatedMenus}
            totalCount={filteredMenus.length}
            handleDeleteMenu={handleDeleteMenu}
            handleEditMenu={handleEditMenu}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={(l) => {
              setLimit(l);
              setPage(1);
            }}
            loading={isLoading}
          />
        </Box>
      </Box>

      {/* ✅ AddUser can be reused for edit as well */}
      <AddMenu
        handleClose={handleClose}
        open={open}
        editingMenu={editingMenu} // pass menu if editing
      />

      <ToastContainer />
    </PageContainer>
  );
}

export default memo(Index);
