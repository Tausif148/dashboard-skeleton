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
import { memo, useMemo } from 'react';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

interface IProps {
  userList: any[] | undefined;
  handleDeleteUser: (id: string) => void;
  handleEditUser: (user: any) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  loading: boolean;
  total?: number;
  refetch?: () => void;
  totalCount?: number;
}

function UserTable({
  userList,
  handleDeleteUser,
  handleEditUser,
  page,
  setPage,
  limit,
  setLimit,
  loading,
  total = 0,
  totalCount = 0,
}: IProps) {



  // ================= PAGINATION =================
  const totalPages = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(
        (Number(totalCount) || 0) /
        (Number(limit) || 1)
      )
    );
  }, [totalCount, limit]);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  const handlePageInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);

    if (!value || value < 1) {
      setPage(1);
      return;
    }

    if (value > totalPages) {
      setPage(totalPages);
      return;
    }

    setPage(value);
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
          <Table sx={{ whiteSpace: 'nowrap', '& .MuiTableCell-root': { whiteSpace: 'nowrap' } }}>
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
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    {' '}
                    Sr No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    {' '}
                    FullName
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    Role
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    User Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    Mobile Number
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    City
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    State
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    Country
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    PinCode
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '0.8rem' }}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : !userList || userList.length === 0 ? (
                // 👉 No data from API
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <Typography>No data available</Typography>
                  </TableCell>
                </TableRow>
              ) : userList.length === 0 ? (
                // 👉 No search result
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <Typography>No search results found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                userList.map((user: any, index: number) => (
                  <TableRow key={user.user_id} hover
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
                    <TableCell sx={{ paddingLeft: '30px' }}>
                      {(page - 1) * limit + index + 1}
                    </TableCell>

                    <TableCell>
                      {user.first_name} {user.last_name}
                    </TableCell>

                    <TableCell>{user.role}</TableCell>

                    <TableCell>{user.username}</TableCell>

                    <TableCell>{user.mobile_number}</TableCell>

                    <TableCell>{user.city}</TableCell>

                    <TableCell>{user.state}</TableCell>

                    <TableCell>{user.country}</TableCell>

                    <TableCell>{user.pincode}</TableCell>

                    <TableCell>
                      <IconButton color="primary" size="small" onClick={() => handleEditUser(user)}>
                        <IconPencil size={18} />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteUser(user.user_id)}
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
  );
}

export default memo(UserTable);
