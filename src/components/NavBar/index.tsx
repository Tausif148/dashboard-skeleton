import { Close } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LOGO from "src/assets/logo.png";
import SocialFloatingBar from "./SocialFloatingBar";
import SubscribeBanner from "./SubscribeBanner";
import TopNav from "./TopNav";

const NAV_ITEMS = ["ABOUT US", "LOUNGES", "JOURNALS", "MEMBERSHIP", "CONTACT"];

export default function NavBar() {
  const [visible, setVisible] = useState<boolean>(true);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (nextOpen: boolean) => () => {
    setOpen(nextOpen);
  };

  return (
    <>
      <SubscribeBanner open={visible} onClose={() => {
        setVisible(false);
      }} />
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          // smaller top offset on xs to preserve above-the-fold content
          top: { xs: visible ? 80 : 8, sm: visible ? 50 : 12, md: visible ? 70 : 50 },
          left: 0,
          right: 0,
          background: "transparent",
          color: theme.palette.custom?.white ?? "#fff",
          px: { xs: 2, md: 6 },
          pointerEvents: "auto",
        }}
      >

        <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 56, sm: 64 } }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              mr: 2,
            }}
          >
            {/* responsive height: smaller on xs so header stays compact */}
            <Box
              sx={{
                height: { xs: 90, sm: 100, md: 120, lg: 120 },
                width: { xs: 120, sm: 180, md: 180, lg: 180 },
                // display: "block",
                // maxHeight: 142,
              }}
            >
              <img src={LOGO} style={{ height: '100%', width: '100%' }} />
            </Box>
          </Box>

          {/* Desktop navigation */}
          {mdUp ? (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", px: { xs: 0, md: 4 } }}>
              <TopNav />
            </Box>
          ) : (
            // keep an empty flexible box so logo and controls are spaced
            <Box sx={{ flex: 1, minWidth: 0 }} />
          )}

          {/* Right side: join button (desktop/lg), compact on md, hamburger on sm/xs */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Full-size button on large and up */}
            {/* <Box sx={{ display: { xs: 'none', md: 'none', lg: 'inline-flex' } }}>
              <GoldButton label="JOIN CLUB" fontSize="1.2rem" />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'inline-flex', lg: 'none' }, '& .MuiButton-root': { px: 2 } }}>
              <GoldButton label="JOIN" fontSize="0.95rem" py={0.8} borderRadius="6px" />
            </Box> */}

            {/* Hamburger on small screens */}
            {!mdUp && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <SocialFloatingBar />

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2,
            bgcolor: "background.paper",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box >
              {/* <img
                src={DARK_LOGO}
                alt="logo"
                style={{ height: 48, width: "auto", display: "block" }}
              /> */}
            </Box>

            <IconButton
              component="button"
              onClick={toggleDrawer(false)}
              sx={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "text.primary",
                fontWeight: 600,
                px: 1,
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <Divider />

          <List sx={{ my: 1 }}>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item}
                component={Link}
                to={item === "ABOUT US" ? "/about-us" : `/${item.toLowerCase()}`}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
                />
              </ListItemButton>
            ))}
          </List>

          {/* <Box sx={{ mt: "auto", pt: 2 }}>
            <GoldButton label="JOIN CLUB" />
          </Box> */}
        </Box>
      </Drawer>

    </>
  );
}
