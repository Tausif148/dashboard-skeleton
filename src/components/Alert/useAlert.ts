import React from "react";

import AlertContext from "./AlertContext";

export default function useConfirmModal() {
  return React.useContext(AlertContext);
}
