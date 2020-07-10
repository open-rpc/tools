import React, { useState } from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import {
  Typography, Card, Box, CardHeader, CardContent, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary, Tooltip, IconButton,
  Snackbar,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MonacoEditor from "@etclabscore/react-monaco-editor";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./cardListItem.css";
import Alert from "../alert/alert";
import useDarkMode from "use-dark-mode";
import copy from "copy-to-clipboard";

interface IProps {
  log: IJSONRPCLog;
  filter: string[];
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      padding: "0 8px 0 8px",
    },
    cardContent: {
      padding: "0 8px 0 8px",
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
  const classes = useStyles();

  const handleEditorDidMount = (__: any, editor: any) => {
    return;
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
      <Card raised={true} className={callClass} style={{ color: "white" }}>
        <CardHeader
          className={classes.cardHeader}
          title={props.log.type + " - " + props.log.method}
          subheader={props.log.timestamp.toISOString()}
        />
        <CardContent className={classes.cardContent}>
          { props.log.batchId ?
            <Typography>Batch: {props.log.batchId}</Typography>
            :
            null
          }
          <ExpansionPanel
            defaultExpanded={props.open}
            TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Payload</Typography>
              <Tooltip title="Copy to clipboard">
                <IconButton style={{ padding: "4px" }} onClick={(event) => handleCopy(event, props.log.payload)}>
                  <AssignmentIcon style={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MonacoEditor
                width="350"
                height="350"
                language="json"
                value={JSON.stringify(props.log.payload, null, 4)}
                editorDidMount={handleEditorDidMount}
                editorOptions={{
                  minimap: {
                    enabled: false,
                  },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
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
