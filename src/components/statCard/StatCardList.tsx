// src/components/StatCardList.tsx

import { Box, CardContent, CircularProgress, Typography } from '@mui/material';

interface CardType {
  title: string;          // Hardcoded title
  digits: string | number; // Count from API
  bgcolor: string;        // e.g. 'primary', 'success', etc.
  icon?: React.ReactNode; // Optional: future use
  subStatus?: string[]
}

interface StatCardListProps {
  cards: CardType[];
  boxWidth?: number;
  boxHeight?: number;
  gap?: number;
  isLoading?: boolean

}

const StatCardList = ({
  cards,
  boxWidth = 150,
  boxHeight = 90,
  gap = 3,
  isLoading,
}: StatCardListProps) => {
  return (
    <Box display="flex" justifyContent="center" gap={gap} flexWrap="wrap">
      {cards.map((card, i) => (
        <Box
          key={i}
          bgcolor={`${card.bgcolor}.light`}
          borderRadius={2}
          width={boxWidth}
          height={boxHeight}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <CardContent sx={{ padding: '3px', paddingBottom: '8px !important' }}>
            <Typography color={`${card.bgcolor}.main`} variant="h3" fontWeight={550}>
              {isLoading ? <CircularProgress size={17} /> : card.digits}
            </Typography>
            <Typography color={`${card.bgcolor}.main`} variant="h6" fontWeight={550}>
              {card.title}
            </Typography>
            {card?.subStatus?.map((i) => {
              return (
                <Typography color={`${card.bgcolor}.main`} sx={{ fontSize: 10, mb: -1, padding: 0 }}>
                  {i}
                </Typography>
              )
            })}

          </CardContent>
        </Box>
      ))}
    </Box>
  );
};

export default StatCardList;
