import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { memo, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DaysFilter from 'src/components/Filter/DaysFilter';
import {
  CalendarMonthIcon,
  CheckCircleOutlineIcon,
  CreditCardIcon,
  DescriptionIcon,
  PendingActionsIcon,
  PeopleIcon,
  RefreshIcon,
  ShoppingCartIcon,
  StorageIcon,
} from 'src/icons/icons';

import { useFetchDashboardReport } from 'src/queries/useFetchDashboard';
import { DashboardCard } from './DashboardCard';
import OpdOverview from './OpdOverview';
import { QuickAction } from './QuickAction';
import { TodayShadule } from './TodayShadule';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PointElement,
  LineController,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

const formatCurrency = (value?: number | string | null) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number.isNaN(amount) ? 0 : amount);
};

const formatNumber = (value?: number | string | null) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(Number.isNaN(amount) ? 0 : amount);
};

const index = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const {
    data: dashboardResponse,
    refetch,
    isLoading,
  } = useFetchDashboardReport({ page, limit, search, from_date: fromDate, to_date: toDate });

  const dashboardData = dashboardResponse?.data || {};

  const purchaseSummary = dashboardData?.purchase_summary || {};
  const sellingSummary = dashboardData?.selling_summary || {};
  const expenseSummary = dashboardData?.expense_summary || {};
  const stockSummary = dashboardData?.stock_summary || {};
  const governmentSummary = dashboardData?.government_summary || {};
  const profitLossSummary = dashboardData?.profit_loss_summary || {};

  /* ---------------------------------------------
   MONTHLY PERFORMANCE CHART OPTIONS
--------------------------------------------- */
  const monthlyReport = Array.isArray(dashboardData?.monthly_report)
    ? dashboardData?.monthly_report
    : [];

  /* ---------------------------------------------
    PIE CHART
 --------------------------------------------- */
  const expenseHeadSummary = Array.isArray(dashboardData?.expense_head_summary)
    ? dashboardData?.expense_head_summary
    : [];

  return (
    <PageContainer title="Dashboard Report" description="Business dashboard report">
      <Box
        sx={{
          backgroundColor: '#fff',
          pt: 1,
        }}
      >
        {/* Modern Header Section */}
        <Box
          sx={{
            m: 2,
            mb: 3,
            mt: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
          }}
        >
          {/* Left Content: Title & Subtitle */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#111827',
                mb: 0.5,
                fontSize: { xs: '1rem', md: '1.5rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                fontSize: '0.85rem',
              }}
            >
              Here's what's happening in your OPD today.
            </Typography>
          </Box>

          {/* Right Content: Filters & Actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            {/* Date Range Picker */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                px: 1,
                py: 0.5,
                '& .MuiInputBase-root': {
                  border: 'none !important',
                  boxShadow: 'none !important',
                  '& fieldset': { border: 'none' },
                },
              }}
            >
              <DaysFilter
                title=""
                onChange={(range) => {
                  if (range && range[0] && range[1]) {
                    setPage(1);
                    setFromDate(range[0]);
                    setToDate(range[1]);
                  } else {
                    setPage(1);
                    setFromDate('');
                    setToDate('');
                  }
                }}
              />
            </Box>

            {/* Refresh Icon */}
            <IconButton
              aria-label="refresh"
              onClick={() => refetch?.()}
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                color: '#6B7280',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                  color: '#111827',
                },
              }}
            >
              <RefreshIcon />
            </IconButton>

            {/* Reset Filters Button styled as primary action */}
            <Button
              variant="contained"
              onClick={() => {
                setPage(1);
                setLimit(10);
                setSearch('');
                setFromDate('');
                setToDate('');
                setTimeout(() => {
                  refetch?.();
                }, 0);
              }}
              sx={{
                backgroundColor: '#4f46e5', // Primary Purple
                color: '#fff',
                fontWeight: 600,
                px: 3,
                py: 1,
                height: '42px',
                textTransform: 'none',
                borderRadius: '8px',
                boxShadow:
                  '0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#4338CA', // Darker Purple
                  boxShadow:
                    '0 6px 8px -1px rgba(79, 70, 229, 0.3), 0 4px 6px -1px rgba(79, 70, 229, 0.2)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Reset Filters
            </Button>
          </Box>
        </Box>

        {/* Dashboard Summary Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: 'repeat(4, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
            gap: 1.5,
            m: 2,
            alignItems: 'stretch',
          }}
        >
          <DashboardCard
            icon={CalendarMonthIcon}
            title="Today's Appointments"
            iconColor="#4F46E5" // Indigo
            data={[
              {
                label: 'Total Appointments',
                value: 28,
              },
            ]}
          />

          <DashboardCard
            icon={PeopleIcon}
            title="Patients Registered"
            iconColor="#10B981" // Green
            data={[
              {
                label: 'Registered Patients',
                value: 16,
              },
            ]}
          />

          <DashboardCard
            icon={PendingActionsIcon}
            title="Pending Consultations"
            iconColor="#F59E0B" // Amber
            data={[
              {
                label: 'Pending Cases',
                value: 7,
              },
            ]}
          />

          <DashboardCard
            icon={CheckCircleOutlineIcon}
            title="Completed Consultations"
            iconColor="#22C55E" // Emerald
            data={[
              {
                label: 'Completed Cases',
                value: 21,
              },
            ]}
          />
        </Box>

        {/* Charts */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '1fr 1fr',
            },
            gap: 1.5,
            m: 2,
          }}
        >
          <TodayShadule />
          <OpdOverview monthlyReport={monthlyReport} />
        </Box>

        {/* Stat Cards */}
        <Box
          sx={{
            m: 2,
            mb: 5,
            mt: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#111827',
              mb: 1.5,
              fontSize: { xs: '1rem', md: '1rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Quick Actions
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
              },
              gap: 1.5,
            }}
          >
            <QuickAction
              icon={ShoppingCartIcon}
              title="Total Purchase"
              value={formatCurrency(purchaseSummary?.total_purchase_amount)}
              subtitle={`Count: ${formatNumber(purchaseSummary?.total_purchase_count)}`}
              icon2={`Qty: ${formatNumber(purchaseSummary?.total_purchase_qty)}`}
            />

            <QuickAction
              icon={DescriptionIcon}
              title="Total Selling"
              value={formatCurrency(sellingSummary?.total_selling_amount)}
              subtitle={`Count: ${formatNumber(sellingSummary?.total_selling_count)}`}
              icon2={`Selling Amt: ${formatCurrency(sellingSummary?.total_selling_amount)}`}
            />

            <QuickAction
              icon={CreditCardIcon}
              title="Total Expenses"
              value={formatCurrency(expenseSummary?.total_expense_amount)}
              subtitle={`Count: ${formatNumber(expenseSummary?.total_expense_count)}`}
              icon2={`Heads: ${expenseHeadSummary?.length || 0}`}
            />

            <QuickAction
              icon={StorageIcon}
              title="Stock Summary"
              value={formatNumber(stockSummary?.total_remaining_stock)}
              subtitle={`Items: ${formatNumber(stockSummary?.stock_item_count)}`}
              icon2={`Remaining: ${formatNumber(stockSummary?.total_remaining_stock)}`}
            />
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default memo(index);
