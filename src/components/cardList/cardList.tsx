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

  const cardRender = (call, i) => {
    if (props.logs.length - 1 === i) {
      return <CardListItem log={call} filter={props.filter} open={true} />;
    } else {
      return <CardListItem log={call} filter={props.filter} open={false} />;
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      {props.logs.map((call, i) => (
        cardRender(call, i)
      ))}
    </div>
  );
};

export default CardList;
