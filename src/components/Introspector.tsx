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

const Introspector: React.FC<IProps> = (props) => {
    // get listener traffic
    // TODO implement RING BUFFER
    var [history] = useWebRequest();
    console.log(history);

    return(
        <div>
            <Typography>
                {JSON.stringify(props.logs)}
                {JSON.stringify(history)}
            </Typography>
        </div>
    );
};

export default Introspector;
