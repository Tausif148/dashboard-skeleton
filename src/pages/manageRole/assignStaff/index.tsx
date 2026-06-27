import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
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
import { useAssignStaffActions } from 'src/apiActions/useAssignStaffActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { useFetchAssignStaff } from 'src/queries/useFetchAssignStaff';
import AddAssignStaff from './components/AddAssignStaff';
import AssignStaffTable from './components/AssignStaffTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingAssignStaff, setEditingAssignStaff] = useState<any | null>(null);

  // pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();
  const {
    data: assignStaffList,
    refetch,
    isLoading,
  } = useFetchAssignStaff({ page, limit, search });

  // ✅ Normalize API response — backend sometimes returns:
  // - { data: { assignments: [...] } }  (multiple records)
  // - { data: { assigned_role_id, role, employee_name, ... } } (single record, no wrapper)
  // - { data: [...] } (plain array)
  const tableData = useMemo(() => {
    const rawData = assignStaffList?.data;

    if (Array.isArray(rawData?.assignments)) {
      return rawData.assignments;
    }
    if (Array.isArray(rawData)) {
      return rawData;
    }
    if (rawData && typeof rawData === 'object') {
      return [rawData];
    }
    return [];
  }, [assignStaffList]);

  const { tryDelete } = useAssignStaffActions();

  const handleDeleteAssignStaff = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this assign staff?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditAssignStaff = (assignStaff: any) => {
    setEditingAssignStaff(assignStaff);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAssignStaff(null);
  };

  return (
    <PageContainer title="Directors" description="Manage directors">
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          minWidth: 0,
          p: 3,

          border: '1px solid #EEF1F4',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Assign Staff List</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}
            >
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
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setEditingAssignStaff(null);
                  setOpen(true);
                }}
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
                Add Assign Staff
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <AssignStaffTable
            assignStaffList={tableData}
            handleDeleteAssignStaff={handleDeleteAssignStaff}
            handleEditAssignStaff={handleEditAssignStaff}
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

      {/* ✅ AddModule can be reused for edit as well */}
      <AddAssignStaff
        handleClose={handleClose}
        open={open}
        editingStaff={editingAssignStaff}
        refetch={refetch}
      />
    </PageContainer>
  );
}

export default memo(Index);