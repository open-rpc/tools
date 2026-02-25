// CardListItem.tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { IJSONRPCLog } from '../logsReact/logsReact';
import LogChips from '../logChips/LogChips';
import { formatRelative } from 'date-fns';
import {
  Typography,
  Card,
  Box,
  CardHeader,
  CardContent,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Snackbar,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import './cardListItem.css';
import Alert from '../alert/alert';
import copy from 'copy-to-clipboard';
import { JSONSchema, OpenrpcDocument } from '@open-rpc/tool-types';
import openrpcDocumentToJSONRPCSchema from '../../helpers/openrpcDocumentToJSONRPCSchema';
import openrpcDocumentToJSONRPCSchemaResult from '../../helpers/openrpcDocumentToJSONRPCSchemaResult';
import * as monaco from 'monaco-editor';
import { MonacoEditor, addDiagnostics } from '@open-rpc/monaco-editor-react';
const PREFIX = 'cardListItem';

const classes = {
  cardHeader: `${PREFIX}-cardHeader`,
  cardContent: `${PREFIX}-cardContent`,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  [`& .${classes.cardHeader}`]: {
    padding: '8px',
    paddingBottom: '0px',
    paddingTop: '0px',
  },
  [`& .${classes.cardContent}`]: {
    padding: '8px !important',
  },
}));

interface IProps {
  log: IJSONRPCLog;
  filter: string[];
  open: boolean;
  openrpcDocument?: OpenrpcDocument;
  darkMode?: boolean;
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLogItemBackground = (log: IJSONRPCLog, theme: Theme): any => {
  const paletteType = theme.palette.mode;
  if (log.payload.error) {
    return { backgroundColor: theme.palette.error[paletteType] };
  }
  return {};
};

const getCardStyle = (log: IJSONRPCLog) => {
  if (log.method.includes('rpc.')) {
    return 'call rpc-call';
  }
  if (log.type === 'response') {
    if (log.payload.error) {
      return 'call response-error';
    }
    return 'call response-success';
  }
  return 'call request';
};

const CardListItem: React.FC<IProps> = (props) => {
  const theme = useTheme();
  const callClass = getCardStyle(props.log);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // Height settings for dynamic adjustment
  const MAX_HEIGHT = 300;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const MIN_COUNT_OF_LINES = 3;
  const LINE_HEIGHT = 20;
  const [editorHeight, setEditorHeight] = React.useState(170);

  // Store editor instance from the custom Editor component
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (newValue?: string) => {
    if (newValue) {
      const lines = newValue.split('\n').length;
      const newHeight = Math.min(lines * LINE_HEIGHT, MAX_HEIGHT);
      setEditorHeight(newHeight);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCopy = (event: React.MouseEvent, value: any) => {
    event.stopPropagation();
    setSnackbarOpen(true);
    copy(JSON.stringify(value, null, 4));
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  // When the file changes, update the editor's model
  useEffect(() => {
    if (!editorRef.current) return;
    if (!props.openrpcDocument || !props.log.method) return;

    let schema: JSONSchema;
    if (props.log.type === 'request') {
      schema = openrpcDocumentToJSONRPCSchema(props.openrpcDocument);
    } else {
      schema = openrpcDocumentToJSONRPCSchemaResult(props.log.method, props.openrpcDocument);
    }

    const model = editorRef.current?.getModel();
    if (!model) {
      return;
    }

    //model.setValue(JSON.stringify(props.log.payload, null, 2) || "");
    //monaco.editor.setModelLanguage(model, "json");

    const newModel = monaco.editor.createModel(JSON.stringify(props.log.payload, null, 2), 'json');
    editorRef.current?.setModel(newModel);

    // Optionally, update diagnostics:
    addDiagnostics(newModel.uri.toString(), schema, monaco);

    // Adjust height based on new content
    handleEditorChange(newModel.getValue());
  }, [props.openrpcDocument, props.log]);

  return (
    <StyledBox
      m={2}
      key={JSON.stringify(props.log)}
      className={[
        'call-box',
        `${props.log.type === 'response' ? 'response' : ''}`,
        `${props.filter.includes(props.log.method) || props.filter.includes('all') ? '' : 'hidden'}`,
      ].join(' ')}
    >
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="success">Payload Copied to Clipboard</Alert>
      </Snackbar>
      <Card
        raised
        elevation={8}
        className={callClass}
        style={getLogItemBackground(props.log, theme)}
      >
        <CardHeader
          title={props.log.method}
          action={<LogChips log={props.log} />}
          subheader={
            <Typography variant="caption" color="textSecondary">
              {formatRelative(new Date(), props.log.timestamp)}
            </Typography>
          }
        />
        <CardContent className={classes.cardContent}>
          {props.log.batchId && <Typography>Batch: {props.log.batchId}</Typography>}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} component="div" disableRipple>
              <Tooltip title="Copy to clipboard">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(e, props.log.payload);
                  }}
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Typography>Payload</Typography>
                  <AssignmentIcon style={{ fontSize: 14, marginLeft: 8 }} />
                </span>
              </Tooltip>
            </AccordionSummary>
            <AccordionDetails style={{ margin: 0, padding: 0 }}>
              <MonacoEditor
                key={JSON.stringify(props.log)} // optional: force remount if needed
                width="100%"
                height={editorHeight}
                language="json"
                value={JSON.stringify(props.log.payload, null, 4)}
                options={{
                  automaticLayout: true,
                  theme: theme.palette.mode === 'dark' ? 'vs-dark' : 'vs',
                  minimap: { enabled: false },
                  glyphMargin: false,
                  overviewRulerBorder: false,
                  showFoldingControls: 'always',
                  hideCursorInOverviewRuler: true,
                  scrollbar: {
                    useShadows: false,
                  },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'off',
                  fixedOverflowWidgets: true,
                  readOnly: true,
                }}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </StyledBox>
  );
};

export default React.memo(CardListItem);
