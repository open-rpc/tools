import * as React from 'react';
import { IJSONRPCLog } from '../logsReact/logsReact';
import { Chip } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

interface IProps {
  log: IJSONRPCLog;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getChipColorForLog = (log: IJSONRPCLog, theme: Theme, isNotification = false): any => {
  const paletteType = theme.palette.mode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styles: any = {
    backgroundColor: theme.palette.success[paletteType],
  };

  if (isNotification) {
    styles.backgroundColor = theme.palette.info[paletteType];
    styles.marginRight = theme.spacing(1);
    return styles;
  }

  if (log.type === 'request') {
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
      {props.log.notification && (
        <Chip label="notification" style={getChipColorForLog(props.log, theme, true)} />
      )}
      <Chip label={props.log.type} style={getChipColorForLog(props.log, theme)} />
    </>
  );
};

export default React.memo(LogChips);
