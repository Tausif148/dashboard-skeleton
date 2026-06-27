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
  roleList: any[] | undefined;
  handleDeleteRole: (id: string) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
  handleEditRole: (role: any) => void
}


function RoleTable({
  roleList,
  handleDeleteRole,
  page,
  setPage,
  limit,
  setLimit,
  loading,
  handleEditRole,

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
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}> Sr No.</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}> Role Name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : (!roleList || roleList.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No content available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                roleList.map((role: any, index: number) => (
                  <TableRow key={role.role_id} hover
                    sx={{
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
                    <TableCell sx={{
                      textAlign: 'center',
                    }}>{index + 1}</TableCell>

                    <TableCell sx={{
                      textAlign: 'center',
                    }}>{role.role}</TableCell>
                    <TableCell sx={{
                      textAlign: 'center',
                    }}>
                      <IconButton color="success" size="small" onClick={() => handleEditRole(role)}
                      >
                        <IconPencil size={18} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteRole(role.role_id)} size="small">
                        <IconTrash size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ✅ Pagination */}
        <Divider />
        <Stack
          gap={1}
          p={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>


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
      </Box>
    </Grid >
  );
}

export default memo(RoleTable);