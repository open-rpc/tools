import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CardList from "./cardList";

// add method type so we can attribute cards to different method calls
export interface IJSONRPCLog {
    type: "response" | "request";
    timestamp: Date;
    payload: any;
}

/* tslint:disable */
interface IProps {
    logs: IJSONRPCLog[];
}
/* tslint:enable */

const JSONRPCLogger: React.FC<IProps> = (props) => {

    return (
        <ScrollToBottom>
            <CardList history={props.logs} />
        </ScrollToBottom>        
    )
};

export default JSONRPCLogger;
