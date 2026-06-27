import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { ISlider } from ".";
import { LeftTransition } from "./LeftTransition";
import { Transition } from "./Transition";

function SliderUI(props: ISlider) {
  const {
    open,
    children,
    size,
    noHeight,
    extraSmall,
    backgroundColor = "#fff",
    fullWidth,
    onClose,
    zIndex,
    leftOpen = false,
    paperSx,
    toTop,
    id,
  } = props;

  return (
    <Box
      id={id}
      sx={{
        backgroundColor,
      }}
    >
      <Dialog
        disableAutoFocus
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth={fullWidth}
        maxWidth={size || "lg"}
        open={open}
        PaperProps={{
          sx: {
            margin: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            height: noHeight ? null : "100vh",
            width: extraSmall || "calc(90% - 64px)",
            backgroundColor,
            zIndex: zIndex || 99999,
            ...paperSx,
          },
        }}
        sx={{
          top: 0,
          "& .MuiDialog-container.MuiDialog-scrollPaper": {
            backgroundColor: "rgba(163, 197, 255, 0.4)",
            justifyContent: leftOpen ? "flex-start" : "flex-end",
            ...(noHeight && {
              alignItems: leftOpen
                ? "flex-start"
                : toTop
                  ? "flex-start"
                  : "flex-end",
            }),
            height: noHeight ? null : "auto",
          },
        }}
        TransitionComponent={leftOpen ? LeftTransition : Transition}
        onClose={onClose}
      >
        {children}
      </Dialog>
    </Box>
  );
}

export default React.memo(SliderUI);
