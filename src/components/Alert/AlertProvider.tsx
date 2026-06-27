/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useMemo, useState } from "react";

import Alert from "./Alert";
import AlertContext from "./AlertContext";

export type VariantTypes = "success" | "warning" | "error";

export type ShowParams = {
  title: ReactNode;
  message: ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onClose?: (v: any) => void;
  isLoading?: boolean
};

interface ProviderState extends ShowParams {
  open: boolean;
}

export interface AlertContextType {
  show: (params: ShowParams) => void;
}

const DEFAULT_STATE = {
  open: false,
  title: "",
  message: "",
  cancelText: "Cancel",
  confirmText: "Confirm",
  isLoading: false
};

interface IAlertProvider {
  children: React.JSX.Element;
}

const AlertProvider = (props: IAlertProvider) => {
  const { children } = props;

  const [state, setState] = useState<ProviderState>(DEFAULT_STATE);

  const show = (params: ShowParams) => {
    setState(() => ({ ...DEFAULT_STATE, ...params, open: true }));
  };

  const handleClose = (v: any) => {
    const { onClose } = state;
    setState((v) => ({ ...v, open: false }));
    onClose?.(v);
  };

  const context = useMemo(() => ({ show }), [show]);

  const handleConfirm = async () => {
    const { onConfirm } = state;
    try {
      setState((v) => ({ ...v, isLoading: true }));
      await onConfirm?.();
      setState((v) => ({ ...v, open: false }));
    } catch {
      setState((v) => ({ ...v, open: false }));
    }
  };
  return (
    <>
      <AlertContext.Provider value={context}>{children}</AlertContext.Provider>
      <Alert
        cancelText={state.cancelText || ""}
        confirmText={state.confirmText || ""}
        handleClose={handleClose}
        message={state.message}
        open={state.open}
        title={state.title}
        onConfirm={handleConfirm}
        isLoading={state.isLoading || false}
      />
    </>
  );
};

export default AlertProvider;
