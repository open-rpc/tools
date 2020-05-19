import React from "react";
import { Typography, Card, Box, CardHeader, CardContent, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import useWebRequest from "../hooks/useWebRequest";
import MonacoEditor from 'react-monaco-editor';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// add method type so we can attribute cards to different method calls
export interface IJSONRPCLog {
    type: string,
    timestamp: Date;
    payload: any;
}

interface IProps {
    //logs: IJSONRPCLog[];
}

// Loops through history objects and creates cards to display each one
const makeCards = (history: IJSONRPCLog[]) => (
    <ul>
        { history.map(call => (
            <Box m={2}>
                <Card raised={true}>         
                    <CardHeader title={call.type} subheader={call.timestamp.toISOString()}/>
                    <CardContent>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Payload</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <MonacoEditor 
                                    width="400"
                                    height="400"
                                    language="json"
                                    value={JSON.stringify(call.payload, null, 4)}
                                    options={{
                                        minimap: {
                                            enabled: false,
                                        },
                                        scrollBeyondLastLine: false,
                                        lineNumbers: "on",
                                        fixedOverflowWidgets: true,
                                        readOnly: true 
                                    }}
                                /> 
                            </ExpansionPanelDetails>
                        </ExpansionPanel>                                               
                    </CardContent>
                </Card>
            </Box>
        ))}
    </ul>
);

const Introspector: React.FC<IProps> = (props) => {
    // get listener traffic
    const [history] = useWebRequest();
    history.sort((a: IJSONRPCLog, b: IJSONRPCLog) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
    });

    return(
        <div>
            {makeCards(history)}
        </div>
    );
};

export default Introspector;
