import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import { usePlanActions } from 'src/apiActions/usePlanActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { AddIcon, CloseIcon, RefreshIcon, SearchIcon } from 'src/icons/icons';
import { useFetchPlan } from 'src/queries/useFetchPlan';
import AddPlan from './components/AddPlan';
import PlanTable from './components/PlanTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);

  //pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();
  const { data: planList, refetch, isLoading } = useFetchPlan({ page, limit, search });
  console.log('planList', planList);

  const { tryDelete } = usePlanActions();

  const handleDeletePlan = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this plan?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPlan(null);
  };

  return (
    <PageContainer title="Plan Page" description="Plan customized page">
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
          <Grid size={{ xs: 12, md: 6 }} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Plan List</Typography>
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
                Add Plan
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <PlanTable
            planList={planList?.data?.plans || []}
            handleDeletePlan={handleDeletePlan}
            handleEditPlan={handleEditPlan}
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

      {/* AddPlan can be reused for edit as well */}
      <AddPlan handleClose={handleClose} open={open} editingPlan={editingPlan} />
    </PageContainer>
  );
}

export default memo(Index);
