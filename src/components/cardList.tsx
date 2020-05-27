import React, { useEffect } from "react";
import {IJSONRPCLog} from "./logs-react";
import CardListItem from "./cardListItem";


interface IProps {
    history: IJSONRPCLog[];
}

const CardList: React.FC<IProps> = (props) => {

    return (
        <>
        { props.history.map((call) => (
            <CardListItem log={call}></CardListItem>
        ))}
        </>
    );
};

export default CardList;
