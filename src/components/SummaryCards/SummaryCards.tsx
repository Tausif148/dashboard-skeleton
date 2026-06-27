import { Card, CardContent, Grid, Typography } from '@mui/material';

// ── Single card ───────────────────────────────────────────────────────────────

interface SummaryCardProps {
    label: string;
    value: string | number;
    color?: string;
}

function SummaryCard({ label, value, color = '#4f46e5' }: SummaryCardProps) {
    return (
        <Card
            sx={{
                border: '1px solid #EEF1F4',
                borderTop: `3px solid ${color}`,
                borderRadius: '5px',
                boxShadow: 'none',
            }}
        >
            <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    {label}
                </Typography>
                <Typography variant="h5" fontWeight={600} color={color}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

// ── Grid wrapper ──────────────────────────────────────────────────────────────

export interface SummaryCardItem {
    label: string;
    value: string | number;
    color?: string;
}

interface SummaryCardsProps {
    cards: SummaryCardItem[];
}

export default function SummaryCards({ cards }: SummaryCardsProps) {
    return (
        <Grid container spacing={2} mt={2} mb={2}>
            {cards.map((card) => (
                <Grid key={card.label} size={{ xs: 6, sm: 3 }}>
                    <SummaryCard label={card.label} value={card.value} color={card.color} />
                </Grid>
            ))}
        </Grid>
    );
}