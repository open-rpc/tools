import React, { useState, useEffect, useCallback, useRef } from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import LogChips from "../logChips/LogChips";
import { formatRelative } from "date-fns";
import {
  Typography, Card, Box, CardHeader, CardContent, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary, Tooltip, IconButton,
  Snackbar,
  Grid,
  Chip,
  Button,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import MonacoEditor from "@etclabscore/react-monaco-editor";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./cardListItem.css";
import Alert from "../alert/alert";
import copy from "copy-to-clipboard";
import { addDiagnostics } from "@etclabscore/monaco-add-json-schema-diagnostics";
import { JSONSchema, OpenrpcDocument } from "@open-rpc/meta-schema";
import * as monaco from "monaco-editor";
import openrpcDocumentToJSONRPCSchema from "../../helpers/openrpcDocumentToJSONRPCSchema";
import openrpcDocumentToJSONRPCSchemaResult from "../../helpers/openrpcDocumentToJSONRPCSchemaResult";
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface IProps {
  log: IJSONRPCLog;
  filter: string[];
  open: boolean;
  openrpcDocument?: OpenrpcDocument;
}

const getChipColorForLog = (log: IJSONRPCLog): any => {
  if (log.type === "request") {
    return "primary";
  }

  if (log.payload.error) {
    return "secondary";
  }

  return "primary";
};

const getLogItemBackground = (log: IJSONRPCLog, theme: Theme): any => {
  const paletteType = theme.palette.type;
  if (log.payload.error) {
    return { backgroundColor: theme.palette.error[paletteType] };
  }

  return {};
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      padding: "8px",
      paddingBottom: "0px",
      paddingTop: "0px",
    },
    cardContent: {
      padding: "8px !important",
    },
  }),
);

const getCardStyle = (log: IJSONRPCLog) => {
  if (log.method.includes("rpc.")) {
    return "call rpc-call";
  }
  if (log.type === "response") {
    if (log.payload.error) {
      return "call response-error";
    }
    return "call response-success";
  }
  return "call request";
};

const CardListItem: React.FC<IProps> = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useTheme();

  const callClass = getCardStyle(props.log);
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState();
  const classes = useStyles();

  // BEGIN HEIGHT SETTING SHANAYNAYS
  const MAX_HEIGHT = 300;
  const MIN_COUNT_OF_LINES = 3;
  const LINE_HEIGHT = 20;
  const [height, setHeight] = useState(170);
  const valueGetter = useRef();
  const handleEditorChange = useCallback(() => {
    const countOfLines = (valueGetter as any).current
      .getValue()
      .split('\n').length;
    if (countOfLines >= MIN_COUNT_OF_LINES) {
      const currentHeight = countOfLines * LINE_HEIGHT;
      if (MAX_HEIGHT > currentHeight) {
        setHeight(currentHeight);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // END HEIGHT SETTING SHANAYNAYS

  useEffect(() => {
    if (editor === undefined) {
      return;
    }
    let s: JSONSchema;

    if (props.log.type === "request") {
      s = openrpcDocumentToJSONRPCSchema(props.openrpcDocument);
    } else {
      s = openrpcDocumentToJSONRPCSchemaResult(props.log.method, props.openrpcDocument);
    }
    const modelName = (props.openrpcDocument && props.openrpcDocument.info) ? props.openrpcDocument.info.title : "inspector";
    const modelUriString = `inmemory://${modelName}-${Math.random()}.json`;
    const modelUri = monaco.Uri.parse(modelUriString);
    const model = monaco.editor.createModel(JSON.stringify(props.log.payload, null, 2) || "", "json", modelUri);
    (editor as any).setModel(model);

    addDiagnostics(modelUri.toString(), s, monaco);
    valueGetter.current = editor;
    handleEditorChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openrpcDocument, editor]);

  const handleEditorDidMount = (__: any, ed: any) => {
    setEditor(ed);
  };

  const handleCopy = (event, value) => {
    event.stopPropagation();
    setOpen(true);
    copy(JSON.stringify(value, null, 4));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m={2} key={JSON.stringify(props.log)} className={[
      "call-box",
      `${props.log.type === "response" ? "response" : ""}`,
      `${props.filter.includes(props.log.method) || props.filter.includes("all") ? "" : "hidden"}`,
    ].join(" ")}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="success">Payload Copied to Clipboard</Alert>
      </Snackbar>
      <Card raised={true} className={callClass} style={getLogItemBackground(props.log, theme)} elevation={8}>
        <CardHeader
          title={props.log.method}
          action={
            <LogChips log={props.log} />
          }
          subheader={
          <Typography variant="caption" color="textSecondary">
            {formatRelative(new Date(), props.log.timestamp)}
          </Typography>
          }
        />
        <CardContent className={classes.cardContent}>
          {props.log.batchId ?
            <Typography>Batch: {props.log.batchId}</Typography>
            :
            null
          }
          <ExpansionPanel
            defaultExpanded={true}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Tooltip title="Copy to clipboard">
                <Button
                  onClick={(event) => handleCopy(event, props.log.payload)}
                  endIcon={
                    <AssignmentIcon style={{ fontSize: 14 }} />
                  }
                >
                  Payload
                </Button>
              </Tooltip>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ margin: 0, padding: 0 }}>
              <MonacoEditor
                width="100%"
                height={height}
                language="json"
                value={JSON.stringify(props.log.payload, null, 4)}
                editorDidMount={handleEditorDidMount}
                editorOptions={{
                  automaticLayout: true,
                  useShadows: false,
                  glyphMargin: false,
                  overviewRulerBorder: false,
                  showFoldingControls: "always",
                  minimap: {
                    enabled: false,
                  },
                  hideCursorInOverviewRuler: true,
                  scrollbar: {
                    useShadows: false,
                    scrollByPage: false,
                  },
                  scrollBeyondLastLine: false,
                  lineNumbers: "off",
                  fixedOverflowWidgets: true,
                  readOnly: true,
                }}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(CardListItem);
