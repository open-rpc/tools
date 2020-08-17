import React, { useEffect, useRef } from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import CardListItem from "../cardListItem/cardListItem";

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

  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listEndRef && listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.logs]);

  return (
    <div style={{ width: "100%", height: "100%"}}>
      {props.logs.map((call, i) => (
        cardRender(call, i)
      ))}
      <div ref={listEndRef}></div>
    </div>
  );
};

export default CardList;
