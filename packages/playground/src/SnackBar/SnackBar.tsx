import * as React from 'react';
import { ReactElement, forwardRef } from 'react';
import {
  Snackbar,
  SnackbarContent as MuiSnackbarContent,
  IconButton,
  styled,
  SnackbarContentProps,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { green, amber } from '@mui/material/colors';
import { IUISchema } from '../UISchema';

export enum NotificationType {
  error = 'error',
  warn = 'warning',
  info = 'info',
  success = 'success',
  debug = 'debug',
}
const variantIcon = {
  [NotificationType.success]: CheckCircleIcon,
  [NotificationType.warn]: WarningIcon,
  [NotificationType.error]: ErrorIcon,
  [NotificationType.info]: InfoIcon,
  [NotificationType.debug]: InfoIcon,
} as const;

// Base component that forwards refs
const BaseSnackbarContent = forwardRef<HTMLDivElement, SnackbarContentProps>((props, ref) => (
  <MuiSnackbarContent ref={ref} {...props} />
));
BaseSnackbarContent.displayName = 'BaseSnackbarContent';

// Styled version of our base component
const StyledSnackbarContent = styled(BaseSnackbarContent)(({ theme }) => ({
  '&.success': {
    color: green[600],
  },
  '&.error': {
    backgroundColor: theme.palette.error.dark,
  },
  '&.info': {
    color: theme.palette.primary.dark,
  },
  '&.debug': {
    color: theme.palette.secondary.dark,
  },
  '&.warning': {
    color: amber[700],
  },
  '& .icon': {
    fontSize: 20,
  },
  '& .iconVariant': {
    opacity: 0.9,
    marginRight: theme.spacing(2),
  },
  '& .message': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .close': {
    padding: theme.spacing(1),
  },
  margin: theme.spacing(2),
}));

interface IProps {
  uiSchema?: IUISchema;
  notification: ISnackBarNotification | null;
  close: () => void;
}

export interface ISnackBarNotification {
  type: NotificationType;
  message: string;
}

interface ISnackBarContentProps extends Omit<SnackbarContentProps, 'ref' | 'variant'> {
  uiSchema?: IUISchema;
  onClose: () => void;
  notificationType: NotificationType;
  message: ReactElement;
}

// Our main content component that also forwards refs
const SnackBarContent = forwardRef<HTMLDivElement, ISnackBarContentProps>(
  ({ message, onClose, notificationType, ...other }, ref) => {
    const IconComponent = variantIcon[notificationType] || InfoIcon;

    return (
      <StyledSnackbarContent
        ref={ref}
        className={notificationType}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className="message">
            <IconComponent className="icon iconVariant" />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className="close"
            onClick={onClose}
            size="small"
          >
            <CloseIcon className="icon" />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
);
SnackBarContent.displayName = 'SnackBarContent';

const SnackBarWrapper: React.FC<IProps> = ({ notification, close }) => {
  if (!notification) {
    return null;
  }

  return (
    <Snackbar
      open
      autoHideDuration={10000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <SnackBarContent
        onClose={close}
        notificationType={notification.type}
        message={<span>{notification.message}</span>}
      />
    </Snackbar>
  );
};

export const SnackBar = SnackBarWrapper;
