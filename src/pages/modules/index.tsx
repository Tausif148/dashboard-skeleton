import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useModuleActions } from 'src/apiActions/useModuleActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { AddIcon, CloseIcon, RefreshIcon, SearchIcon } from 'src/icons/icons';
import { useFetchModule } from 'src/queries/useFetchModule';
import AddModule from './components/AddModule';
import ModuleTable from './components/ModuleTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<any | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();

  const { data, refetch, isLoading } = useFetchModule();


  const { tryDelete } = useModuleActions();

  const handleDeleteModule = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this module?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditModule = (module: any) => {
    setEditingModule(module);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingModule(null);
  };


  // Pagination and Search
  const rawModules: any[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.modules)) return data.data.modules;
    return [];
  }, [data]);

  // 1. Filter client-side
  const filteredModules = useMemo(
    () =>
      rawModules.filter((m: any) =>
        m.module_name.toLowerCase().includes(search.toLowerCase()),
      ),
    [rawModules, search],
  );

  // 2. Paginate client-side
  const paginatedModules = useMemo(
    () => filteredModules.slice((page - 1) * limit, page * limit),
    [filteredModules, page, limit],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };


  return (
    <PageContainer title="Module Page" description="Module customized page">
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
            <Typography variant="h4">Module List</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <IconButton aria-label="refresh" onClick={() => refetch()}>
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
                  backgroundColor: '#4f46e5',
                  '&:hover': { backgroundColor: '#4f46e5' },
                }}
              >
                Add Module
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <ModuleTable
            paginatedModules={paginatedModules}
            totalCount={filteredModules.length}
            handleDeleteModule={handleDeleteModule}
            handleEditModule={handleEditModule}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={(l) => { setLimit(l); setPage(1); }}
            loading={isLoading}
          />
        </Box>
      </Box>

      <AddModule handleClose={handleClose} open={open} editingModule={editingModule} />
      <ToastContainer />
    </PageContainer>
  );
}

export default memo(Index);