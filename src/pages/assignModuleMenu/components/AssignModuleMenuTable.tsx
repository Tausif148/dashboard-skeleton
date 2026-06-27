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
  assignList: any[] | undefined;
  handleDeleteAssign: (id: string) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
  handleEditAssign: (assign: any) => void
}


function AssignTable({
  assignList,
  handleDeleteAssign,
  page,
  setPage,
  limit,
  setLimit,
  loading,
  handleEditAssign,

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
                border: '1px solid rgba(255,255,255,0.15)',
                py: 1.5,
                px: 1,
                whiteSpace: 'normal',
                lineHeight: 1.4,
              },
            }}>
              <TableRow>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}> Sr No.</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Plan Name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Module Name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Menu Name</Typography></TableCell>
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
              ) : (!assignList || assignList.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No content available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                assignList.map((assign: any, index: number) => (
                  <TableRow key={assign.menu_id} hover
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
                    <TableCell sx={{ paddingLeft: '30px' }}>{index + 1}</TableCell>
                    <TableCell>{assign.plan_name}</TableCell>
                    <TableCell>
                      {assign.module_ids?.map((m: any) => (
                        <div key={m.module_id}>{m.module_name}</div>
                      ))}
                    </TableCell>

                    <TableCell>
                      {assign.menu_ids?.map((m: any) => (
                        <div key={m.menu_id}>{m.menu_name}</div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton color="success" size="small" onClick={() => handleEditAssign(assign)}>
                        <IconPencil size={18} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteAssign(assign.plan_id)} size="small">
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

export default memo(AssignTable);