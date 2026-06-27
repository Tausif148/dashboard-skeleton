import React from "react";

import { SnackbarContextType } from "./SnackbarProvider";

const SnackbarContext = React.createContext<SnackbarContextType | undefined>(
  undefined,
);
export default SnackbarContext;
