import Close from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import React, { ReactNode } from "react";

type IProps = {
  open: boolean;
  title: ReactNode;
  message: ReactNode;
  cancelText: string;
  confirmText: string;
  handleClose: (v: any) => void;
  onConfirm: () => void;
  isLoading: boolean
};

function Alert(props: IProps) {
  const {
    open,
    title,
    message,
    handleClose,
    onConfirm,
    cancelText,
    confirmText,
    isLoading
  } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      sx={{ maxWidth: "450px", margin: "auto" }}
    >
      <DialogTitle>{title}</DialogTitle>
      <Box position="absolute" right={0} top={0}>
        <IconButton onClick={() => handleClose("topClose")}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent sx={{ paddingTop: 0 }}>
        <Box>{message}</Box>
      </DialogContent>
      <DialogActions>
        {/* <Button
          color="secondary"
          sx={{ fontSize: "0.7rem" }}
          variant="contained"
          onClick={() => handleClose("bottomClose")}
        >
          {cancelText}
        </Button>
        <Button
          color="primary"
          sx={{ fontSize: "0.7rem" }}
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : confirmText}
        </Button> */}

        <Button
          variant="outlined"
          onClick={() => handleClose("bottomClose")}
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
            py: 1,
            borderColor: "#9e9e9e",
            color: "#555",
            '&:hover': {
              borderColor: "green",
              backgroundColor: "#f5f5f5",
              color: "green",

            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
            py: 1,
            backgroundColor: "#d32f2f",
            '&:hover': {
              backgroundColor: "#b71c1c",
            },
            '&.Mui-disabled': {
              backgroundColor: "#ef9a9a",
              color: "#fff",
            },
          }}
        >
          {isLoading ? "Processing..." : confirmText}
        </Button>

      </DialogActions>
    </Dialog>


  );
}

export default React.memo(Alert);
