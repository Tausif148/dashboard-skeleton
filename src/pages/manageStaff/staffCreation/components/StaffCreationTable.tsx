import VisibilityIcon from '@mui/icons-material/Visibility';
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
  Typography,
} from '@mui/material';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import { memo, useState } from 'react';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { IManPower } from 'src/interface/manPower.types';
import StaffCreationQuickView from './StaffCreationQuickView';

interface IProps {
  staffList: IManPower[] | undefined;
  handleDeleteStaff: (id: string) => void;
  handleEditStaff: (manpower: any) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  pagination?: {
    page?: number;
    limit?: number;
    total_count?: number;
    total_pages?: number;
  };
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
}

function StaffCreationTable({
  staffList,
  handleDeleteStaff,
  page,
  setPage,
  limit,
  setLimit,
  pagination,
  loading,
  handleEditStaff,
}: IProps) {
  // derive pagination values (fallback to parent state)
  const lastPage = Math.max(pagination?.total_pages || 1, 1);
  const totalCount = pagination?.total_count || 0;
  const currentPage = pagination?.page || page;
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<IManPower | null>(null);

  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem =
    totalCount === 0
      ? 0
      : Math.min((currentPage - 1) * limit + (staffList?.length || 0), totalCount);

  const handleViewStaff = (staff: IManPower) => {
    setSelectedStaff(staff);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setSelectedStaff(null);
  };


  return (
    <Grid container spacing={2}>
      <Box
        width="100%"
        sx={{
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          scrollbarWidth: 'thin',
        }}
      >
        <TableContainer
          sx={{
            border: '1px solid #EEF1F4',
            borderRadius: '5px',
            width: 'max-content',
            minWidth: '100%',
            mb: 1,
          }}
        >
          <Table
            sx={{
              whiteSpace: 'nowrap',
              minWidth: 1000,
              '& .MuiTableCell-root': { whiteSpace: 'nowrap' },
            }}
          >
            <TableHead
              sx={{
                background: 'linear-gradient(90deg, #4f46e5 0%, #4f46e5 100%)',
                '& .MuiTableCell-root': {
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  py: 1.5,
                  px: 1,
                  whiteSpace: 'normal',
                  lineHeight: 1.4,
                },
              }}
            >
              <TableRow>
                {/* <TableCell><Typography sx={{ color: "#fff", fontSize: '0.8rem' }}>Sr No.</Typography></TableCell> */}
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Sr No </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Employee Name</Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Designation</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Mobile</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>DOB</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Joining Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Aadhar</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>PAN</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : !staffList || staffList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    <Typography>No staff available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                staffList.map((item: IManPower, index: number) => (
                  <TableRow key={item.employee_id ?? index} hover sx={{
                    transition: '0.2s ease-in-out',
                    '&:nth-of-type(even)': {
                      backgroundColor: '#f8fafc',
                    },
                    '&:hover': {
                      backgroundColor: '#edf7f1',
                    },
                    '& .MuiTableCell-root': {
                      border: '1px solid #eef1f4',
                      py: 1,
                      px: 1.5,
                      fontSize: '0.8rem',
                      verticalAlign: 'center',
                      whiteSpace: 'nowrap',
                    },
                  }}>
                    {/* Sr No */}
                    <TableCell sx={{ textAlign: 'center' }} >
                      {(page - 1) * limit + index + 1}
                    </TableCell>

                    {/* Name */}
                    <TableCell>{item.employee_name || '—'}</TableCell>

                    {/* Designation */}
                    <TableCell>{item.designation_name || '—'}</TableCell>

                    {/* Mobile */}
                    <TableCell>{item.mobile_number || '—'}</TableCell>

                    {/* Email */}
                    <TableCell>{item.email || '—'}</TableCell>

                    {/* DOB */}
                    <TableCell>{item.dateofbirth || '—'}</TableCell>

                    {/* Joining */}
                    <TableCell>{item.dateofjoining || '—'}</TableCell>

                    {/* Aadhar */}
                    <TableCell>{item.aadhar_number || '—'}</TableCell>

                    {/* PAN */}
                    <TableCell>{item.pan_number || '—'}</TableCell>

                    {/* Actions */}
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleViewStaff(item)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="success"
                        size="small"
                        onClick={() => handleEditStaff(item)}
                      >
                        <IconPencil size={18} />
                      </IconButton>

                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteStaff(String(item.employee_id))}
                      >
                        <IconTrash size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <StaffCreationQuickView
          open={viewOpen}
          selectedStaff={selectedStaff}
          handleClose={handleCloseView}
        />
      </Box>

      {/* ── Pagination ── */}
      <Box width="100%">
        <Divider />
        <Stack
          gap={1}
          p={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" gap={1.5} alignItems="center">
            <CustomTextField
              type="number"
              value={page}
              onChange={(e: any) => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= lastPage) setPage(val);
              }}
              sx={{ width: 70 }}
              size="small"
            />

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

            <Typography variant="body2">
              {startItem}–{endItem} of {totalCount}
            </Typography>
          </Box>

          <Box display="flex" gap={1}>
            <IconButton onClick={() => setPage(1)} disabled={page === 1}>
              <IconChevronsLeft />
            </IconButton>
            <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              <IconChevronLeft />
            </IconButton>
            <IconButton onClick={() => setPage(page + 1)} disabled={page >= lastPage}>
              <IconChevronRight />
            </IconButton>
            <IconButton onClick={() => setPage(lastPage)} disabled={page >= lastPage}>
              <IconChevronsRight />
            </IconButton>
          </Box>
        </Stack>

      </Box>
    </Grid>
  );
}

export default memo(StaffCreationTable);
