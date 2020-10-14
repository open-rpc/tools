import React from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import CardListItem from "../cardListItem/cardListItem";
import ScrollToBottom from "react-scroll-to-bottom";
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
    <div style={{ width: "100%" }}>
      {props.logs.map((call, i) => (
        cardRender(call, i)
      ))}
    </div>
  );
};

export default (props) => (
  <ScrollToBottom className="scroll-to-bottom">
    <CardList
      logs={props.logs}
      filter={props.filter}
      openRecentPayload={props.openRecentPayload}
    />
  </ScrollToBottom>
);
