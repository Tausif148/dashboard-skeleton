// SocialFloatingBar.tsx
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, IconButton } from "@mui/material";

export default function SocialFloatingBar() {

    return (
        <Box
            aria-hidden={false}
            sx={{
                position: "fixed",
                right: 20,                     // distance from right edge
                top: "40%",
                transform: "translateY(-50%)",
                display: { xs: "none", md: "flex" }, // hide on small screens
                flexDirection: "column",
                gap: 1,
                zIndex: 1400,                 // above most content
                pointerEvents: "auto",
            }}
        >
            {[
                { key: "ig", label: "Instagram", icon: <InstagramIcon fontSize="small" /> },
                { key: "li", label: "LinkedIn", icon: <LinkedInIcon fontSize="small" /> },
                { key: "fb", label: "Facebook", icon: <FacebookIcon fontSize="small" /> },
                { key: "yt", label: "YouTube", icon: <YouTubeIcon fontSize="small" /> },
            ].map((s) => (
                <IconButton
                    key={s.key}
                    aria-label={s.label}
                    href="#"
                    size="small"
                    sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "8px",
                        color: (theme) => theme.palette.custom?.gold || "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "none",
                        transition: "transform 160ms ease, background-color 160ms ease, color 160ms ease",
                        // hover state: subtle background, icon color change and small translate/scale
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            transform: 'translateX(-4px) scale(1.06)',
                        },
                        // ensure the child svg icon inherits the transition
                        '& .MuiSvgIcon-root': {
                            transition: 'inherit',
                        }

                    }}
                >
                    {s.icon}
                </IconButton>
            ))}
        </Box>
    );
}
