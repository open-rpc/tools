import React from "react";
import {IJSONRPCLog} from "./logs-react";
import { Typography, Card, Box, CardHeader, CardContent, ExpansionPanel,
    ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import MonacoEditor from "react-monaco-editor";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue, lightGreen, orange, red } from "@material-ui/core/colors";

interface IProps {
    log: IJSONRPCLog;
}

const getCardStyle = (log: IJSONRPCLog) => {

    if (log.method.includes("rpc.")) {
        return {
            backgroundColor: orange[500],
            color: "white",
        };
    }
    if (log.type == "response") {
		if(log.payload.error) {
			return {
				backgroundColor: red[500],
				color: "white"
			}
		}
        return {
            backgroundColor: lightGreen[500],
            color: "white"
        };
	}
    return {
        backgroundColor: blue[500],
        color: "white"
    };
};

const CardListItem: React.FC<IProps> = (props) => {
    const style = getCardStyle(props.log);

    return (
        <Box m={2} key={JSON.stringify(props.log)}>
            <Card raised={true} style={style}>
                <CardHeader
                    title={props.log.type + " - " + props.log.method}
                    subheader={props.log.timestamp.toISOString()}/>
                <CardContent>
                    <ExpansionPanel
                        TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
                        style={style}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
