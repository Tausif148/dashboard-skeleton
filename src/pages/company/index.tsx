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
import { useCompanyActions } from 'src/apiActions/useCompanyActions';
import { useAlert } from 'src/components/Alert';
import PageContainer from 'src/components/container/PageContainer';
import { AddIcon, CloseIcon, RefreshIcon, SearchIcon } from 'src/icons/icons';
import { useFetchCompany } from 'src/queries/useFetchCompany';
import useExport from 'src/utils/tableExport/useExport';
import AddCompany from './components/AddCompany';
import { COMPANY_COLUMNS, Company } from './components/companyExportColumns';
import CompanyTable from './components/CompanyTable';

// ─── Component ────────────────────────────────────────────────────────────────
function Index() {
  const [open, setOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const alert = useAlert();
  const { exportExcel, exportPdf } = useExport();

  const {
    data: companyList,
    refetch,
    isLoading,
  } = useFetchCompany({
    page,
    limit,
    search,
  });

  const { tryDelete } = useCompanyActions();

  // Single resolved source — API uses "companies" (not "companys")
  const companies: Company[] = companyList?.data?.companies ?? [];
  const totalCount = companyList?.data?.totalCount ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleDeleteCompany = (id: string) => {
    alert?.show({
      title: 'Confirm',
      message: 'Do you want to delete this company?',
      onConfirm: async () => {
        await tryDelete(id);
        refetch();
      },
    });
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCompany(null);
  };


  // ─── Constants ────────────────────────────────────────────────────────────────
  const REPORT_TITLE = 'Company List';
  const FILE_NAME = 'Company_Report';


  // ── Shared export config ─────────────────────────────────────────────────────
  const exportConfig = {
    columns: COMPANY_COLUMNS,
    data: companies,
    fileName: FILE_NAME,
    reportTitle: REPORT_TITLE,
  } as const;

  const handleExportExcel = () =>
    exportExcel({ ...exportConfig, excel: { sheetName: 'Companies' } });

  const handleDownloadPDF = () => exportPdf(exportConfig);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <PageContainer title="Company Page" description="Company customized page">
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          p: 3,
          border: '1px solid #EEF1F4',
          mb: 3,
        }}
      >
        {/* ================= SUMMARY CARDS ================= */}

        <Grid container alignItems="center" spacing={2}>
          {/* Page title */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Company List</Typography>
          </Grid>

          {/* Action bar */}
          <Grid size={{ xs: 12, md: 8 }}>
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
              {/* Refresh */}
              <IconButton aria-label="refresh" onClick={() => refetch?.()} sx={{ flexShrink: 0 }}>
                <RefreshIcon />
              </IconButton>

              {/* Search */}
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
                  width: 380,
                  '& fieldset': { border: 'none' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {search ? (
                        <IconButton
                          size="small"
                          onClick={() => handleSearchChange('')}
                        >
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

              {/* Add Company */}
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
                Add Company
              </Button>

              {/* Export Excel */}
              <Button
                variant="outlined"
                onClick={handleExportExcel}
                sx={{
                  color: '#4f46e5',
                  fontWeight: 600,
                  px: 2,
                  height: '40px',
                  textTransform: 'none',
                  borderRadius: '5px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  border: '2px solid #4f46e5',
                  '&:hover': { backgroundColor: '#4f46e5', color: '#fff' },
                }}
              >
                Export Excel
              </Button>

              {/* Download PDF */}
              <Button
                variant="outlined"
                onClick={handleDownloadPDF}
                sx={{
                  color: '#4f46e5',
                  fontWeight: 600,
                  px: 2,
                  height: '40px',
                  textTransform: 'none',
                  borderRadius: '5px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  border: '2px solid #4f46e5',
                  '&:hover': { backgroundColor: '#4f46e5', color: '#fff' },
                }}
              >
                Download PDF
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Table */}
        <Box sx={{ mt: 3 }}>
          <CompanyTable
            companyList={companies}
            totalCount={totalCount}
            handleDeletecompany={handleDeleteCompany}
            handleEditcompany={handleEditCompany}
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

      {/* Add / Edit drawer */}
      <AddCompany handleClose={handleClose} open={open} editingCompany={editingCompany} />
    </PageContainer>
  );
}

export default memo(Index);
