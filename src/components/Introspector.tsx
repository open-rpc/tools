import React from "react";
import { Typography } from "@material-ui/core";

export interface IJSONRPCLog {
    timestamp: Date;
    payload: any;
}

interface IProps {
    logs: IJSONRPCLog[];
}

const Introspector: React.FC<IProps> = (props) => {
    //USE EFFECT for if Logs are given
    //USE EFFECT for if logs are not given -> monitor page traffic

    return(
        <div>
            <Typography>
                {JSON.stringify(props.logs)}
            </Typography>
        </div>
    );
};

export default Introspector;
