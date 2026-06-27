import Box from "@mui/material/Box";

export default function RoundedLeftBox({ children }: any) {
    return (
        <Box
            sx={{
                width: 800,   // adjust width
                height: 200,  // adjust height
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#fff",
                background: "linear-gradient(90deg, #0f1516 0%, #1f2427 100%)",
                border: "2px solid white",    // full border
                borderTopLeftRadius: "80px",  // round only left top
                borderBottomLeftRadius: "80px", // round only left bottom
                borderTopRightRadius: "0",    // keep right side square
                borderBottomRightRadius: "0", // keep right side square
            }}
        >
            {children ?? "ABOUT US"}
        </Box>
    );
}
