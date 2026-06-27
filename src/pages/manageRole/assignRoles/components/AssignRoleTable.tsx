import {
  Box,
  Chip,
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
import { memo, useMemo } from 'react';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
// import CustomSwitch from 'src/components/forms/theme-elements/CustomSwitch';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import TableSortHeader from 'src/components/TableSortHeader';
import useTableSort from 'src/hooks/useTableSort';
// import { ICityResponse } from 'src/interface/template.types';

interface IProps {
  roleList: any[] | undefined;
  roleName: string;
  handleDeleteRole: (id: string) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
  handleEditRole: (role: any) => void
  handleViewRole?: (role: any) => void
  // handleToggleState: (id: string) => void
  // toggleLoading: { [id: string]: boolean }
  visible?: boolean[];
}


function AssignRoleTable({
  roleList,
  handleDeleteRole,
  page,
  setPage,
  limit,
  setLimit,
  loading,
  handleEditRole,
  handleViewRole,
  // toggleLoading,
  // handleToggleState,
  visible,
}: IProps) {
  // const lastPage = templateList?.lastPage || 1;
  const enhancedList = (roleList || []).map((r: any) => ({
    ...r,
    assigned_menus: r.menus?.map((m: any) => m.menu_name).join(', ') || '',
    permissions_count: r.menus ? r.menus.length : 0,
  }));
  const { sortKey, sortDirection, handleSort, sortedList } = useTableSort(enhancedList);
  const startItem = (page - 1) * limit + 1;

  const columns = useMemo(() => [
    { key: 'sr', label: 'Sr No.', always: true },
    { key: 'role_name', label: 'Role Name', sortable: true },
    { key: 'module_name', label: 'Assigned Module Name', sortable: true },
    { key: 'assigned_menus', label: 'Assigned Menu Name' },
    { key: 'permissions_count', label: 'Permissions' },
    { key: 'actions', label: 'Actions', always: true },
  ], []);

  const internalVisible = useMemo(() => columns.map(() => true), [columns]);
  const visibleState = visible ?? internalVisible;
  const visibleCount = visibleState.filter(Boolean).length || columns.length;

  return (
    <Grid container spacing={2}>
      <Box width="100%">
        <TableContainer sx={{ border: '1px solid #EEF1F4', borderRadius: '5px' }}>
          <Table sx={{ whiteSpace: 'nowrap' }}>
            <TableHead
              sx={{
                background: 'linear-gradient(90deg, #4f46e5 0%, #4f46e5 100%)',
                '& .MuiTableCell-root': {
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.15)',
                  py: 0.75,
                  px: 1,
                  whiteSpace: 'normal',
                  lineHeight: 1.4,
                  verticalAlign: 'middle',
                },
              }}
            >
              <TableRow>
                {columns.map((col, idx) => {
                  if (!visibleState[idx]) return null;

                  return (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {col.sortable ? (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <TableSortHeader
                            columnKey={col.key}
                            sortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                m: 0,
                              }}
                            >
                              {col.label}
                            </Typography>
                          </TableSortHeader>
                        </Box>
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#fff',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            m: 0,
                          }}
                        >
                          {col.label}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={visibleCount} align="center">
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : (!sortedList || sortedList.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={visibleCount} align="center">
                    <Typography>No content available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                (sortedList || []).map((role: any, index: number) => (
                  <TableRow key={role.assigned_id} hover sx={{
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
                    {columns.map((col, idx) => {
                      if (!visibleState[idx]) return null;

                      if (col.key === 'sr') return <TableCell key={col.key} sx={{ color: "#000", pl: 4, py: 1.2 }}>{startItem + index}</TableCell>;
                      if (col.key === 'role_name') return <TableCell key={col.key} sx={{ color: "#000", fontSize: '0.9rem', py: 1.2 }}>{role.role_name}</TableCell>;
                      if (col.key === 'module_name') return <TableCell key={col.key} sx={{ color: "#000", fontSize: '0.9rem', py: 1.2 }}>{role.module_name}</TableCell>;
                      if (col.key === 'assigned_menus') return <TableCell key={col.key} sx={{ color: "#000", fontSize: '0.9rem', py: 1.2 }}>{role.menus?.map((menu: any) => menu.menu_name).join(", ")}</TableCell>;
                      if (col.key === 'permissions_count') return (
                        <TableCell key={col.key} sx={{ py: 1.2, minWidth: 260, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                          {role.menus && role.menus.length > 0 ? (
                            <Stack spacing={0.6}>
                              {role.menus.map((menu: any, mi: number) => (
                                <Box key={mi} sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                  <Stack direction='row' spacing={0.5}>
                                    <Chip label='Add' size='small' sx={{ bgcolor: menu.is_add ? '#DCFCE7' : '#F3F4F6', color: menu.is_add ? '#065F46' : '#6b7280', fontWeight: 600 }} />
                                    <Chip label='Update' size='small' sx={{ bgcolor: menu.is_update ? '#DCFCE7' : '#F3F4F6', color: menu.is_update ? '#065F46' : '#6b7280', fontWeight: 600 }} />
                                    <Chip label='Delete' size='small' sx={{ bgcolor: menu.is_delete ? '#FEE2E2' : '#F3F4F6', color: menu.is_delete ? '#991B1B' : '#6b7280', fontWeight: 600 }} />
                                    <Chip label='View' size='small' sx={{ bgcolor: menu.is_view ? '#DBEAFE' : '#F3F4F6', color: menu.is_view ? '#1e3a8a' : '#6b7280', fontWeight: 600 }} />
                                  </Stack>
                                </Box>
                              ))}
                            </Stack>
                          ) : (
                            <Typography sx={{ color: '#6b7280' }}>-</Typography>
                          )}
                        </TableCell>
                      );
                      if (col.key === 'actions') return (
                        <TableCell key={col.key} sx={{ py: 1.2 }}>

                          <IconButton color="primary" size="small" onClick={() => handleEditRole(role)}>
                            <IconPencil size={18} />
                          </IconButton>

                          <IconButton color="error" size="small" onClick={() => handleDeleteRole(role.assigned_id)}>
                            <IconTrash size={18} />
                          </IconButton>
                        </TableCell>
                      );

                      return null;
                    })}
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
            <Typography>
              {/* Page {page} of {lastPage} */}
            </Typography>

            {/* Page Input */}
            <CustomTextField
              type="number"
              value={page}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   const newPage = Number(e.target.value);
              //   if (!isNaN(newPage)) {
              //     if (newPage < 1) {
              //       setPage(1);
              //     } else if (newPage > lastPage) {
              //       setPage(lastPage);
              //     } else {
              //       setPage(newPage);
              //     }
              //   }
              // }}
              sx={{ width: 60 }}
              size="small"
            // inputProps={{
            //   min: 1,
            //   max: lastPage,
            // }}
            />

            {/* Rows per page */}
            <CustomSelect
              value={limit}
              onChange={(e: any) => {
                setLimit(Number(e.target.value));
                setPage(1); // reset page when limit changes
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
            // onClick={() => setPage(page + 1)}
            // disabled={page === lastPage}
            >
              <IconChevronRight />
            </IconButton>
            <IconButton
            // onClick={() => setPage(lastPage)}
            // disabled={page === lastPage}
            >
              <IconChevronsRight />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Grid >
  );
}

export default memo(AssignRoleTable);
