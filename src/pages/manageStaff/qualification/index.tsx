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
import { useQualificationActions } from 'src/apiActions/useQualificationActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import useDecoded from 'src/hooks/useDecoded';
import { AddIcon, CloseIcon, RefreshIcon, SearchIcon } from 'src/icons/icons';
import { useFetchQualification } from 'src/queries/useFetchQualification';
import AddQualification from './components/AddQualification';
import QualificationTable from './components/QualificationTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingQualification, setEditingQualification] = useState<any | null>(null);

  //pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();
  const { company_id } = useDecoded();
  const { data: qualificationList, refetch, isLoading } = useFetchQualification({ page, limit, search });
  console.log('qualificationList', qualificationList);

  const { tryDelete } = useQualificationActions();

  const handleDeleteQualification = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this qualification?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditQualification = (qualification: any) => {
    setEditingQualification(qualification);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingQualification(null);
  };

  const filteredQualifications = useMemo(
    () =>
      (qualificationList?.data?.qualifications || []).filter(
        (qualification: any) => Number(qualification.company_id) === Number(company_id),
      ),
    [qualificationList, company_id],
  );

  return (
    <PageContainer title="Qualification Page" description="Qualification customized page">
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          minWidth: 0,
          p: 3,
          border: '1px solid #EEF1F4',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Qualification List</Typography>
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
                  setEditingQualification(null);
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
                Add Qualification
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <QualificationTable
            qualificationList={filteredQualifications}
            handleDeleteQualification={handleDeleteQualification}
            handleEditQualification={handleEditQualification}
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
      <AddQualification handleClose={handleClose} open={open} editingQualification={editingQualification} />
    </PageContainer>
  );
}

export default memo(Index);
