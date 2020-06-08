import React from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import {
  Typography, Card, Box, CardHeader, CardContent, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary
} from "@material-ui/core";
import MonacoEditor from "@etclabscore/react-monaco-editor";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./cardListItem.css";
import useDarkMode from "use-dark-mode";

interface IProps {
  log: IJSONRPCLog;
  filter: string[];
}

const getCardStyle = (log: IJSONRPCLog) => {
  if (log.method.includes("rpc.")) {
    return "call rpc-call"
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

  const handleEditorDidMount = (__: any, editor: any) => {
    return;
  };

  return (
    <Box m={2} key={JSON.stringify(props.log)} className={[
      "call-box",
      `${props.log.type === "response" ? "response" : ""}`,
      `${props.filter.includes(props.log.method) || props.filter.includes("all") ? "" : "hidden"}`
    ].join(" ")}>
      <Card raised={true} className={callClass} style={{ color: "white" }}>
        <CardHeader
          title={props.log.type + " - " + props.log.method}
          subheader={props.log.timestamp.toISOString()} />
        <CardContent>
          <ExpansionPanel
            TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Payload</Typography>
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
