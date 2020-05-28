import React from "react";
import { Typography } from "@material-ui/core";
import useWebRequest from "../hooks/useWebRequest";

export interface IJSONRPCLog {
    timestamp: Date;
    payload: any;
}

interface IProps {
    logs: IJSONRPCLog[];
}

const JSONRPCLogger: React.FC<IProps> = (props) => {
    // get listener traffic
    const [history] = useWebRequest();

    return(
        <div>
            <Typography>
                {JSON.stringify(props.logs)}
                {JSON.stringify([history])}
            </Typography>
        </div>
    );
};

export default JSONRPCLogger;
