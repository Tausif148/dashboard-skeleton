// SubscribeBanner.tsx
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";

type SubscribeBannerProps = {
    message?: string;
    storageKey?: string; // localStorage key for dismissal persistence
    onSubscribe?: () => void;
    visibleByDefault?: boolean;
    open: boolean;
    onClose?: () => void;
};

export default function SubscribeBanner({
    message = "Receive limited release alerts and exclusive event invite",
    onSubscribe,
    open: visible,
    onClose
}: SubscribeBannerProps) {

    // useEffect(() => {
    //     try {
    //         const dismissed = localStorage.getItem(storageKey);
    //         if (dismissed === "1") onClose?.();
    //     } catch {
    //         // ignore localStorage read errors
    //     }
    // }, [storageKey]);

    const handleClose = () => {
        onClose?.();
        // try {
        //     localStorage.setItem(storageKey, "1");
        // } catch {
        //     // ignore
        // }
    };

    const handleSubscribe = () => {
        if (onSubscribe) onSubscribe();
        // optionally close banner after subscribing:
        // handleClose();
    };

    if (!visible) return null;

    return (
        <Box
            component="aside"
            role="region"
            aria-label="Subscribe banner"
            sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0, // fixed to bottom; change to top if needed
                zIndex: (theme) => (theme.zIndex.snackbar + 10),
                backgroundColor: (theme) => (theme as any).palette.custom?.gold ?? "#b99778",
                boxShadow: "0 -1px 6px rgba(0,0,0,0.08)",
            }}
        >
            <Container maxWidth="lg" sx={{ gap: 3, display: "flex", alignItems: "center", justifyContent: 'center', py: 1.25, px: { xs: 2, md: 3 } }}>


                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2 }, justifyContent: "center", position: "relative" }}>
                    <Typography
                        sx={{
                            flex: 1,
                            textAlign: "center",
                            fontSize: { xs: 13, md: "1rem" },
                            color: "#fff",
                            letterSpacing: 0.2,
                            fontWeight: 400,
                            fontFamily: "Poppins, Arial, sans-serif",
                            // fontFamily: "Figtree",
                        }}
                    >
                        {message}
                    </Typography>
                    <Button
                        onClick={handleSubscribe}
                        variant="contained"
                        color="inherit"
                        sx={{
                            backgroundColor: "#fff",
                            color: (theme) => (theme as any).palette.custom?.gold ?? "#333",
                            borderRadius: "6px",
                            textTransform: "uppercase",
                            fontWeight: 500,
                            px: 2,
                            py: 0,
                            minWidth: 110,
                            fontSize:'14px',
                            fontFamily: "Poppins, Arial, sans-serif",
                            "&:hover": { backgroundColor: "#fff", opacity: 0.95 },
                            boxShadow: "none",
                        }}
                    >
                        SUBSCRIBE
                    </Button>


                </Box>
                <IconButton
                    aria-label="Close subscribe banner"
                    onClick={handleClose}
                    sx={{
                        position: { lg: "absolute", xs: "relative" },
                        color: "#fff",
                        background: "transparent",
                        borderRadius: 1,
                        width: 36,
                        height: 36,
                        right: { lg: 40, xs: 0 },
                        "&:hover": { background: "rgba(255,255,255,0.08)",color:"#fff" },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Container>
        </Box>
    );
}
