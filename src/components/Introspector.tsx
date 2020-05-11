import React from "react";
import { Typography } from "@material-ui/core";

export interface JSONRPCLog {
    timestamp: Date;
    payload: any;
}

interface IProps {
    logs: JSONRPCLog[];
}

const Introspector: React.FC<IProps> = (props) => {
    return(
        <div>
            <Typography>
                You are now Bob's nephew.
                {JSON.stringify(props.logs)}
            </Typography>
        </div>
    );
};

export default Introspector;