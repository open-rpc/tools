import React from "react";
import {IJSONRPCLog} from "./logs-react";
import { Typography, Card, Box, CardHeader, CardContent, ExpansionPanel,
    ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import MonacoEditor from "react-monaco-editor";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface IProps {
    log: IJSONRPCLog;
}

const CardListItem: React.FC<IProps> = (props) => {
  return (
    <Box m={2} key={JSON.stringify(props.log)}>
        <Card raised={true}>
            <CardHeader
                title={props.log.type + " - " + props.log.payload.method}
                subheader={props.log.timestamp.toISOString()}/>
            <CardContent>
                <ExpansionPanel 
                    TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography>Payload</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <MonacoEditor
                            width="400"
                            height="400"
                            language="json"
                            value={JSON.stringify(props.log.payload, null, 4)}
                            options={{
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
