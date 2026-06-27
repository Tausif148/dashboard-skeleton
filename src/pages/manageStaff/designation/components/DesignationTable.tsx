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
  designationList: any[] | undefined;
  handleDeleteDesignation: (id: string) => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  setLimit: (l: number) => void;
  search: string;
  setSearch: (s: string) => void;
  loading: boolean;
  handleEditDesignation: (designation: any) => void

}


function DesignationTable({
  designationList,
  handleDeleteDesignation,
  page,
  setPage,
  limit,
  setLimit,
  loading,
  handleEditDesignation,


}: IProps) {
  // const lastPage = templateList?.lastPage || 1;

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

              <TableRow >
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}> Sr No.</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Department Name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}> Designation name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ color: "#fff", fontSize: '0.8rem' }}>Designation Code</Typography></TableCell>
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
              ) : (!designationList || designationList.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No content available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                designationList.map((designation: any, index: number) => (
                  <TableRow key={designation.designation_id} hover
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
                    <TableCell sx={{
                      textAlign: 'center',
                    }}>{index + 1}</TableCell>
                    <TableCell>{designation.department_name}</TableCell>
                    <TableCell>{designation.designation_name}</TableCell>
                    <TableCell>{designation.designation_code}</TableCell>

                    <TableCell sx={{ py: 1.2 }}>
                      <IconButton color="primary" size="small" onClick={() => handleEditDesignation(designation)}>
                        <IconPencil size={18} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteDesignation(designation.designation_id)} size="small">
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

export default memo(DesignationTable);
