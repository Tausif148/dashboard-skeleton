

import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { useDesignationActions } from 'src/apiActions/useDesignationActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import useDecoded from 'src/hooks/useDecoded';
import { AddIcon, CloseIcon, RefreshIcon, SearchIcon } from 'src/icons/icons';
import { useFetchDesignation } from 'src/queries/useFetchDesignation';
import AddDesignation from './components/AddDesignaton';
import DesignationTable from './components/DesignationTable';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState<any | null>(null);

  // ✅// pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const alert = useAlert();
  const { company_id } = useDecoded();
  const { data: designationList, refetch, isLoading } = useFetchDesignation({ page, limit, search });
  console.log("designationList", designationList);

  const { tryDelete } = useDesignationActions();

  const handleDeleteDesignation = (id: string) => {
    alert?.show({
      title: "Confirm",
      message: "Do you want to delete this designation?",
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditDesignation = (designation: any) => {
    setEditingDesignation(designation); // ✅ set designation data in state
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDesignation(null);
  };

  const filteredDesignations = useMemo(
    () =>
      (designationList?.data?.designations || []).filter(
        (designation: any) => Number(designation.company_id) === Number(company_id),
      ),
    [designationList, company_id],
  );
  return (
    <PageContainer title="Designation Page" description="Designation customized page" >

      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          minWidth: 0,
          p: 3,
          border: '1px solid #EEF1F4',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 6, }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Designation List</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <IconButton aria-label="refresh" onClick={() => refetch?.()}><RefreshIcon /></IconButton>
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
                }}>
                Add Designation
              </Button>

            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <DesignationTable
            designationList={filteredDesignations}
            handleDeleteDesignation={handleDeleteDesignation}
            handleEditDesignation={handleEditDesignation}
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

      {/* ✅ AddDesignation can be reused for edit as well */}
      <AddDesignation
        handleClose={handleClose}
        open={open}
        editingDesignation={editingDesignation} // pass designation if editing
      />
    </PageContainer>
  );
}

export default memo(Index);
