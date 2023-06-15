// KIV: keeps default styling code, including for forms and headers, to ensure consistency
// keep default page header here too
// OTHER NOTES FOR STYLING: use nativeselect
import { Slide } from "@mui/material";
import React from "react";

export const SlideTransition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
