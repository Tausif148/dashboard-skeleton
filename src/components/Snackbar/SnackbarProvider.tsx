/* eslint-disable react-hooks/exhaustive-deps */
import { AlertColor } from "@mui/material/Alert";
import React, { useMemo, useState } from "react";

import Snackbar from "./Snackbar";
import SnackbarContext from "./SnackbarContext";

export type VariantTypes = "success" | "warning" | "error";

export type ShowParams = {
  title: string;
  message?: string;
  type: AlertColor;
};

interface ProviderState {
  open: boolean;
  title: string;
  message?: string;
  type?: AlertColor;
}

export interface SnackbarContextType {
  show: (params: ShowParams) => void;
}

const DEFAULT_STATE = {
  open: false,
  title: "",
};

interface ISnackBarProvider {
  children: React.JSX.Element;
}

const SnackBarProvider = (props: ISnackBarProvider) => {
  const { children } = props;

  const [state, setState] = useState<ProviderState>(DEFAULT_STATE);

  const show = (params: ShowParams) => {
    setState(() => ({ ...DEFAULT_STATE, ...params, open: true }));
  };

  const handleClose = () => {
    setState((v) => ({ ...v, open: false }));
  };

  const context = useMemo(() => ({ show }), [show]);

  return (
    <>
      <SnackbarContext.Provider value={context}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        handleClose={handleClose}
        open={state.open}
        title={state.title}
        type={state.type || "success"}
      />
    </>
  );
};

export default SnackBarProvider;
