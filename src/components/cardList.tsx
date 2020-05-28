import React from "react";
import {IJSONRPCLog} from "./logs-react";
import CardListItem from "./cardListItem";
import ScrollToBottom from "react-scroll-to-bottom";


interface IProps {
    logs: IJSONRPCLog[];
}

const CardList: React.FC<IProps> = (props) => {

    return (
        <>
        { props.logs.map((call) => (
            <CardListItem log={call}></CardListItem>
        ))}
        </>
    );
};

export default props => (
    <ScrollToBottom>
        <CardList logs={props.logs}/>
    </ScrollToBottom>
);
