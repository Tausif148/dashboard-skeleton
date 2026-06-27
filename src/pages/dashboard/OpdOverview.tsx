import { Box, Paper, Typography } from '@mui/material';
import type { ChartData } from 'chart.js';
import { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';

const formatCurrency = (value?: number | string | null) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number.isNaN(amount) ? 0 : amount);
};


const safeValue = (value: any, fallback: any = 0) => {
  if (value === undefined || value === null || value === 'string') {
    return fallback;
  }

  return value;
};

interface OpdOverviewProps {
  monthlyReport: any[];
}

const OpdOverview = ({ monthlyReport = [] }: OpdOverviewProps) => {
  /* ---------------------------------------------
       MONTHLY PERFORMANCE CHART OPTIONS
    --------------------------------------------- */

  const formatMonthLabel = (month: string, index: number) => {
    let formattedMonth = month;

    // fallback invalid values
    if (!/^\d{4}-\d{2}$/.test(month)) {
      const generatedMonth = String(index + 1).padStart(2, '0');

      formattedMonth = `2026-${generatedMonth}`;
    }

    const [year, monthNumber] = formattedMonth.split('-');

    const date = new Date(Number(year), Number(monthNumber) - 1);

    return date.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const chartData = useMemo(() => {
    return monthlyReport
      ?.filter((item: any) => item?.month && item?.month !== 'string' && item?.month !== '')
      ?.map((item: any, index: number) => ({
        month: formatMonthLabel(item?.month, index),

        purchase: Number(safeValue(item?.purchase)),

        selling: Number(safeValue(item?.selling)),

        expense: Number(safeValue(item?.expense)),

        profit: Number(safeValue(item?.profit)),
      }));
  }, [monthlyReport]);

  /* ---------------------------------------------
        MONTHLY PERFORMANCE CHART DATA
     --------------------------------------------- */
  const monthlyChartData: ChartData<'bar', number[], string> = {
    labels: chartData?.map((item: any) => item?.month) || [],

    datasets: [
      {
        type: 'bar',
        label: 'Purchase',

        data: chartData?.map((item: any) => item?.purchase || 0) || [],

        backgroundColor: '#26a55a',
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 18,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
        minBarLength: 12,
      },

      {
        type: 'bar',
        label: 'Selling',

        data: chartData?.map((item: any) => item?.selling || 0) || [],

        backgroundColor: '#3b82f6',
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 18,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
        minBarLength: 12,
      },

      {
        type: 'bar',
        label: 'Expense',

        data: chartData?.map((item: any) => item?.expense || 0) || [],

        backgroundColor: '#ef4444',
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 18,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
        minBarLength: 12,
      },

      {
        type: 'bar',
        label: 'Profit',

        data: chartData?.map((item: any) => item?.profit || 0) || [],

        backgroundColor: '#7c3aed',
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 18,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
        minBarLength: 12,
      },
    ],
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        backgroundColor: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.08)',
          borderColor: '#D1D5DB',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: '1px solid #F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.2,
            }}
          >
            Monthly Performance Trend
          </Typography>

          <Typography
            sx={{
              fontSize: '12px',
              color: '#6B7280',
              mt: 0.5,
            }}
          >
            Purchase, Selling, Expense & Profit Overview
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '6px',
            backgroundColor: '#EEF2FF', // light indigo
            color: '#4f46e5', // primary indigo
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {chartData?.length || 0} Records
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          height: 380,
          width: '100%',
          p: 2.5,
        }}
      >
        <Chart
          type="bar"
          data={{
            labels: monthlyChartData?.labels,

            datasets: [
              {
                type: 'bar',
                label: 'Purchase',
                data: monthlyChartData?.datasets?.[0]?.data || [],
                backgroundColor: '#10B981', // Emerald
                borderRadius: 6,
                barThickness: 16,
                categoryPercentage: 0.6,
                yAxisID: 'y',
              },

              {
                type: 'bar',
                label: 'Selling',
                data: monthlyChartData?.datasets?.[1]?.data || [],
                backgroundColor: '#3B82F6', // Blue
                borderRadius: 6,
                barThickness: 16,
                categoryPercentage: 0.6,
                yAxisID: 'y',
              },

              {
                type: 'bar',
                label: 'Expense',
                data: monthlyChartData?.datasets?.[2]?.data || [],
                backgroundColor: '#F43F5E', // Rose
                borderRadius: 6,
                barThickness: 16,
                categoryPercentage: 0.6,

                // SECOND Y AXIS
                yAxisID: 'y1',
              },

              {
                type: 'line',
                label: 'Profit',
                data: chartData?.map((item: any) => (item?.profit > 0 ? item?.profit : 0)) || [],
                borderColor: '#4f46e5', // Indigo
                backgroundColor: '#4f46e5',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#4f46e5',
                pointBorderWidth: 2,
                fill: false,
                yAxisID: 'y',
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
              mode: 'index',
              intersect: false,
            },

            plugins: {
              legend: {
                position: 'top',

                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 18,
                  color: '#374151',

                  font: {
                    size: 11,
                    weight: 600,
                  },
                },
              },

              tooltip: {
                backgroundColor: '#111827',
                padding: 10,

                callbacks: {
                  label: function (context: any) {
                    return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                  },
                },
              },
            },

            scales: {
              x: {
                grid: {
                  display: false,
                },

                ticks: {
                  color: '#64748b',

                  font: {
                    size: 11,
                  },
                },
              },

              // LEFT AXIS
              y: {
                beginAtZero: true,
                position: 'left',

                grid: {
                  color: '#f1f5f9',
                },

                ticks: {
                  color: '#64748b',

                  callback: function (value: any) {
                    if (Math.abs(value) >= 1000) {
                      return `₹${(value / 1000).toFixed(0)}K`;
                    }

                    return `₹${value}`;
                  },
                },
              },

              // RIGHT AXIS
              y1: {
                beginAtZero: true,
                position: 'right',

                grid: {
                  drawOnChartArea: false,
                },

                ticks: {
                  color: '#ef4444',

                  callback: function (value: any) {
                    if (Math.abs(value) >= 10000000) {
                      return `₹${(value / 10000000).toFixed(1)}Cr`;
                    }

                    if (Math.abs(value) >= 100000) {
                      return `₹${(value / 100000).toFixed(1)}L`;
                    }

                    return `₹${value}`;
                  },
                },
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default OpdOverview;
