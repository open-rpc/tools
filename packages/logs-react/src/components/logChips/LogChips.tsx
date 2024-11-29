
import React from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import {Chip} from "@material-ui/core";
import { Theme, useTheme } from "@material-ui/core/styles";

interface IProps {
  log: IJSONRPCLog;
}

const getChipColorForLog = (log: IJSONRPCLog, theme: Theme, isNotification = false): any => {
  const paletteType = theme.palette.type;
  const styles: any = {
    backgroundColor: theme.palette.success[paletteType],
  };

  if (isNotification) {
    styles.backgroundColor = theme.palette.info[paletteType];
    styles.marginRight = theme.spacing(1);
    return styles;
  }

  if (log.type === "request") {
    styles.backgroundColor = theme.palette.primary[paletteType];
    return styles;
  }

  if (log.payload.error) {
    styles.backgroundColor = theme.palette.common.white;
    styles.color = theme.palette.error.main;
    return styles;
  }

  return styles;
};

const LogChips: React.FC<IProps> = (props) => {
  const theme = useTheme();

  return (
    <>
      {
        props.log.notification &&
        <Chip
          label="notification"
          style={getChipColorForLog(props.log, theme, true)}
        />
      }
      <Chip
        label={props.log.type}
        style={getChipColorForLog(props.log, theme)}
      />
    </>
  );
};

export default React.memo(LogChips);
