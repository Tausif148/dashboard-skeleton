import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ITEMS = ["About Us", "Lounges", "Journals", "Membership", "Contact Us"];

export default function TopNav() {
    return (
        <Box sx={{ display: "flex", alignItems: 'center' }}>
            {ITEMS.map((it) => (
                <Button
                    key={it}
                    component={Link}
                    to={it === "About Us" ? "/about-us" : `/${it.toLowerCase()}`}
                    sx={{
                        color: (t) => t.palette.custom?.white ?? "#fff",
                        fontWeight: 400,
                        fontFamily: "Figtree",
                        letterSpacing: { xs: 0.6, sm: 0.8, md: 1 },
                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1.2rem' },
                        px: { xs: 0.5, sm: 1, md: 1.5 },
                        minWidth: 'auto',
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: (t) => t.palette.custom?.gold,
                        },
                    }}
                >
                    {it}
                </Button>
            ))}
        </Box>
    );
}
