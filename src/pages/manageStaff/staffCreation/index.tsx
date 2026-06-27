import DownloadIcon from '@mui/icons-material/Download';
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
import { useStaffCreationActions } from 'src/apiActions/useStaffCreationActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { DownloadOptionsModal } from 'src/components/Download/DownloadOptionsModal';
import { AddIcon, CloseIcon, RefreshIcon, SearchIcon } from 'src/icons/icons';
import { useFetchStaffCreation } from 'src/queries/useFetchStaffCreation';
import useExport from 'src/utils/tableExport/useExport';
import AddStaffCreation from './components/AddStaffCreation';
import StaffCreationTable from './components/StaffCreationTable';
import { STAFF_COLUMNS } from './components/StaffExportColumns';

function Index() {
  const [open, setOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);

  // ✅// pagination + search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();
  const { data: staffList, refetch, isLoading } = useFetchStaffCreation({ page, limit, search });
  console.log('staffList', staffList);

  const { tryDelete } = useStaffCreationActions();

  const handleDeleteStaff = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this staff?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditStaff = (staff: any) => {
    console.log('EDIT CLICKED', staff);
    setEditingStaff(staff);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingStaff(null);
  };


  // ── Export ───────────────────────────────────────────────────────────────
  const { exportExcel, exportPdf, printData } = useExport();

  const exportConfig = {
    columns: STAFF_COLUMNS,
    data: staffList?.data?.manpower || [],
    fileName: 'Staff_Report',
    reportTitle: 'Staff Report',
  } as const;

  const handleExportExcel = () =>
    exportExcel({
      ...exportConfig,
      excel: { sheetName: 'Staff Report' },
    });

  const handleDownloadPDF = () =>
    exportPdf({
      ...exportConfig,
      pdf: {
        orientation: 'landscape',
        fontSize: 8,
        margin: 10,
      },
    });

  const handlePrint = () =>
    printData({
      ...exportConfig,
      print: {
        title: 'Staff Report',
      },
    });

  // ── Download modal state ────────────────────────────────────
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  // Open Modal
  const openDownloadModal = (): void => {
    setDownloadModalOpen(true);
  };

  // Close Modal
  const closeDownloadModal = (): void => {
    setDownloadModalOpen(false);
  };

  return (
    <PageContainer title="Staff Creation Page" description="Staff Creation customized page">
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
          <Grid size={{ xs: 12, md: 5 }} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Staff Creation List</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
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
                  width: 500,
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
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
              >
                Add Staff Creation
              </Button>
              <Button
                variant="contained"
                onClick={openDownloadModal}
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
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <StaffCreationTable
            staffList={staffList?.data?.manpower || []}
            handleDeleteStaff={handleDeleteStaff}
            handleEditStaff={handleEditStaff}
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

      {/* ✅ AddStaffCreation can be reused for edit as well */}
      <AddStaffCreation
        handleClose={handleClose}
        open={open}
        editingStaff={editingStaff}
        refetch={refetch}
      />

      <DownloadOptionsModal
        open={downloadModalOpen}
        onClose={closeDownloadModal}
        handleDownloadPDF={handleDownloadPDF}
        handleDownloadExcel={handleExportExcel}
        handlePrint={handlePrint}
      />
    </PageContainer>
  );
}

export default memo(Index);
