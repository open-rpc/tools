import React from "react";
import {IJSONRPCLog} from "../logsReact/logsReact";
import CardListItem from "../cardListItem/cardListItem";
import ScrollToBottom from "react-scroll-to-bottom";


interface IProps {
	logs: IJSONRPCLog[];
	filter: string[];
}

const CardList: React.FC<IProps> = (props) => {

    return (
        <div style={{width: "100%"}}>
        { props.logs.map((call) => (
            <CardListItem log={call} filter={props.filter}></CardListItem>
        ))}
        </div>
    );
};

export default props => (
    <ScrollToBottom>
        <CardList logs={props.logs} filter={props.filter}/>
    </ScrollToBottom>
);
