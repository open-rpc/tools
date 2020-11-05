import React, { useState, useEffect } from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import { formatRelative } from "date-fns";
import {
  Typography, Card, Box, CardHeader, CardContent, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary, Tooltip, IconButton,
  Snackbar,
  Grid,
  Chip,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MonacoEditor from "@etclabscore/react-monaco-editor";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./cardListItem.css";
import Alert from "../alert/alert";
import useDarkMode from "use-dark-mode";
import copy from "copy-to-clipboard";
import { addDiagnostics } from "@etclabscore/monaco-add-json-schema-diagnostics";
import { JSONSchema, OpenrpcDocument } from "@open-rpc/meta-schema";
import * as monaco from "monaco-editor";
import openrpcDocumentToJSONRPCSchema from "../../helpers/openrpcDocumentToJSONRPCSchema";
import openrpcDocumentToJSONRPCSchemaResult from "../../helpers/openrpcDocumentToJSONRPCSchemaResult";

interface IProps {
  log: IJSONRPCLog;
  filter: string[];
  open: boolean;
  openrpcDocument?: OpenrpcDocument;
}
const colorTypeMap = {
  // request: "#2196f3",
  // response: "#5c6bc0",
  request: "primary",
  response: "secondary",
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

  const darkMode = useDarkMode();
  const callClass = getCardStyle(props.log) + ` ${darkMode.value ? "dark" : ""}`;
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState();
  const classes = useStyles();

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
      <Card raised={true} className={callClass} style={{ color: "white" }} elevation={8}>
        <CardHeader
          style={{ padding: 0 }}
          title={
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              direction="row"
              className={classes.cardHeader}>
              <Grid item>
                <Typography color={colorTypeMap[props.log.type] as any}>{props.log.method}</Typography>
              </Grid>
              <Grid item>
                {props.log.notification && <Chip label="notification" style={{marginRight: "5px"}} />}
                <Chip label={props.log.type} color={colorTypeMap[props.log.type] as any} />
              </Grid>
            </Grid>
          }
          subheader={
            <Typography gutterBottom color="textSecondary" className={classes.cardHeader}>
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
            defaultExpanded={props.open}
            TransitionProps={{ unmountOnExit: true }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Payload</Typography>
              <Tooltip title="Copy to clipboard">
                <IconButton style={{ padding: "4px" }} onClick={(event) => handleCopy(event, props.log.payload)}>
                  <AssignmentIcon style={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ margin: 0, padding: 0 }}>
              <MonacoEditor
                width="100%"
                height="250px"
                language="json"
                value={JSON.stringify(props.log.payload, null, 4)}
                editorDidMount={handleEditorDidMount}
                editorOptions={{
                  automaticLayout: true,
                  useShadows: false,
                  glyphMargin: false,
                  showFoldingControls: "always",
                  // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  minimap: {
                    enabled: false,
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
