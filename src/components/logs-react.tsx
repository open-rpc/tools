import React from "react";
import CardList from "./cardList";

// add method type so we can attribute cards to different method calls
export interface IJSONRPCLog {
    type: "response" | "request";
    timestamp: Date;
    payload: any;
}

interface IProps {
    logs: IJSONRPCLog[];
}

const JSONRPCLogger: React.FC<IProps> = (props) => {
    return (
        <CardList logs={props.logs} />
    );
};

export default JSONRPCLogger;
