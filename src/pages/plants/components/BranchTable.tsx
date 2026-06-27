import {
    Box,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconPencil,
    IconTrash
} from '@tabler/icons-react';
import { memo } from 'react';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

interface IProps {
  branchList: any[] | undefined;
  handleDeleteBranch: (id: string) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
  handleEditBranch: (bank: any) => void
}


function BranchTable({
  branchList,
  handleDeleteBranch,
  page,
  setPage,
  limit,
  setLimit,
  loading,
  handleEditBranch,
}: IProps) {

  return (

    <Grid container spacing={2}>
      <Box width="100%" sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        scrollbarWidth: 'thin',
      }}>
        <TableContainer sx={{ border: '1px solid #EEF1F4', borderRadius: '5px', width: 'max-content', minWidth: '100%', mb: 1 }}>
          <Table sx={{ whiteSpace: 'nowrap', minWidth: 1000, '& .MuiTableCell-root': { whiteSpace: 'nowrap' } }}>
            <TableHead sx={{
              background: 'linear-gradient(90deg, #4f46e5 0%, #4f46e5 100%)',
              '& .MuiTableCell-root': {
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.82rem',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.15)',
                py: 1.5,
                px: 1,
                whiteSpace: 'normal',
                lineHeight: 1.4,
              },
            }}>
              <TableRow>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem', }}> Sr No.</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}> Branch Name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}> Bank Name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Branch Code</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Email</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Registration No.</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Country</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>State</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>City</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>PinCode</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>GST Number</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>PAN Number</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Registration No.</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : (!branchList || branchList.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No content available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                branchList.map((bank: any, index: number) => (
                  <TableRow key={bank.company_id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{bank.branch_name}</TableCell>
                    <TableCell>{bank.bank_name}</TableCell>
                    <TableCell>{bank.branch_code}</TableCell>
                    <TableCell>{bank.email}</TableCell>
                    <TableCell>{bank.registration_number}</TableCell>
                    <TableCell>{bank.country}</TableCell>
                    <TableCell>{bank.state}</TableCell>
                    <TableCell>{bank.city}</TableCell>
                    <TableCell>{bank.pincode}</TableCell>
                    <TableCell>{bank.GST_number}</TableCell>
                    <TableCell>{bank.pan_number}</TableCell>
                    <TableCell>{bank.registration_number}</TableCell>
                    <TableCell sx={{ color: "#fff", fontSize: '0.8rem' }} >
                      <IconButton color="success" size="small" onClick={() => handleEditBranch(bank)}>
                        <IconPencil size={18} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteBranch(bank.company_id)} size="small">
                        <IconTrash size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


      <Box width="100%">
        {/* ✅ Pagination */}
        <Divider />
        <Stack
          gap={1}
          p={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', justifyContent: "space-between" }}>

            {/* Page Input */}
            <CustomTextField
              type="number"
              value={page}
              sx={{ width: 60 }}
              size="small"
            />

            {/* Rows per page */}
            <CustomSelect
              value={limit}
              onChange={(e: any) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              size="small"
            >
              {[5, 10, 20].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>

          {/* Navigation buttons */}
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            <IconButton onClick={() => setPage(1)} disabled={page === 1}>
              <IconChevronsLeft />
            </IconButton>
            <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              <IconChevronLeft />
            </IconButton>
            <IconButton
            >
              <IconChevronRight />
            </IconButton>
            <IconButton
            >
              <IconChevronsRight />
            </IconButton>
          </Box>

        </Stack>

      </Box >
    </Grid >
  );
}

export default memo(BranchTable);