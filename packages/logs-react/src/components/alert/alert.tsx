import * as React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
};

export default Alert;
