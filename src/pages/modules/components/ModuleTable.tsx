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
import { memo } from 'react';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

interface IProps {
  paginatedModules: any[];
  totalCount: number;
  handleDeleteModule: (id: string) => void;
  handleEditModule: (module: any) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  loading: boolean;
}

function ModuleTable({
  paginatedModules,
  totalCount,
  handleDeleteModule,
  handleEditModule,
  page,
  setPage,
  limit,
  setLimit,
  loading,
}: IProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <>
      <Grid container spacing={2}>
        <Box
          width="100%"
          sx={{
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: '6px' },
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
            <Table sx={{ whiteSpace: 'nowrap' }}>
              <TableHead
                sx={{
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
                }}
              >
                <TableRow>
                  {['Sr No.', 'Module Name', 'Actions'].map((col) => (
                    <TableCell key={col} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                        {col}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <CircularProgress size={28} />
                    </TableCell>
                  </TableRow>
                ) : paginatedModules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography>No content available</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedModules.map((module: any, index: number) => (
                    <TableRow key={module.module_id} hover
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
                          textAlign: 'center',
                          fontSize: '0.8rem',
                          verticalAlign: 'center',
                          whiteSpace: 'nowrap',
                        },
                      }}>
                      <TableCell sx={{ textAlign: 'center', }}>
                        {(page - 1) * limit + index + 1}
                      </TableCell>

                      <TableCell sx={{ textAlign: 'center', }}>
                        {module.module_name}</TableCell>

                      <TableCell sx={{ textAlign: 'center', }}>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleEditModule(module)}
                        >
                          <IconPencil size={18} />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteModule(module.module_id)}
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

          {/* Pagination */}
          <Divider />
          <Stack
            gap={1}
            p={2}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              {/* Page number display */}
              <CustomTextField
                type="number"
                value={page}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const val = Math.max(1, Math.min(totalPages, Number(e.target.value)));
                  setPage(val);
                }}
                sx={{ width: 60 }}
                size="small"
                inputProps={{ min: 1, max: totalPages }}
              />

              {/* Total count label */}
              <Typography variant="body2" color="text.secondary">
                of {totalCount} items
              </Typography>

              {/* Rows per page */}
              <CustomSelect
                value={limit}
                onChange={(e: any) => setLimit(Number(e.target.value))}
                size="small"
              >
                {[5, 10, 20, 30, 40, 50].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>

            {/* Navigation buttons */}
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton onClick={() => setPage(1)} disabled={page === 1}>
                <IconChevronsLeft />
              </IconButton>
              <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
                <IconChevronLeft />
              </IconButton>
              <IconButton onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                <IconChevronRight />
              </IconButton>
              <IconButton onClick={() => setPage(totalPages)} disabled={page >= totalPages}>
                <IconChevronsRight />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </>
  );
}

export default memo(ModuleTable);
