import React from "react";
import SliderUI from "./Slider";

export interface ISlider {
  open: any;
  children: React.ReactNode;
  size?: "xl" | "lg" | "sm" | "md" | "xs";
  noHeight?: boolean;
  extraSmall?: string;
  backgroundColor?: string;
  fullWidth?: boolean;
  onClose?: () => void;
  zIndex?: number;
  leftOpen?: boolean;
  paperSx?: any;
  toTop?: boolean;
  id?: string;
}

function Slider(props: ISlider) {
  return <SliderUI {...props} />;
}

export default React.memo(Slider);
