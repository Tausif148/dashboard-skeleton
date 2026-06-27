import { Box, Card, Grid, Typography } from "@mui/material";

interface CardItem {
    label: string;
    value: number;
    icon: React.ReactNode;

    iconBg?: string;
    bg?: string;
    border?: string;
    labelColor?: string;
    valueColor?: string;
}

interface IProps {
    cards: CardItem[];
}

function CountCard({ cards }: IProps) {
    return (
        <Box sx={{pt:1, pb: 2 }}>
            <Grid container spacing={2}>
                {cards.map((card, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card
                            sx={{
                                p: 2,
                                borderRadius: "14px",
                                background: card.bg || "#F5F5F5",
                                border: `1px solid ${card.border || "#E0E0E0"}`,
                                boxShadow: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                transition: "0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                },
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "12px",
                                    background: card.iconBg || "#E0E0E0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {card.icon}
                            </Box>

                            {/* Text */}
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: card.labelColor || "#555",
                                    }}
                                >
                                    {card.label}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 28,
                                        fontWeight: 700,
                                        color: card.valueColor || "#000",
                                    }}
                                >
                                    {card.value}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CountCard;