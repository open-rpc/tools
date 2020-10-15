import React from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import CardListItem from "../cardListItem/cardListItem";
import "./cardList.css";

interface IProps {
  logs: IJSONRPCLog[];
  filter: string[];
  openRecentPayload: boolean;
}

const CardList: React.FC<IProps> = (props) => {

  return (
    <>
      {props.logs.map((call, i) => {
        if (props.logs.length - 1 === i) {
          return <CardListItem log={call} filter={props.filter} open={true} />;
        } else {
          return <CardListItem log={call} filter={props.filter} open={false} />;
        }
      })}
    </>
  );
};

export default CardList;
