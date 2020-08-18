import React, { useEffect, useRef, useState } from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import CardListItem from "../cardListItem/cardListItem";

interface IProps {
  logs: IJSONRPCLog[];
  filter: string[];
  openRecentPayload: boolean;
}

const CardList: React.FC<IProps> = (props) => {

  const listEndRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(true);

  const handleScroll = e => {
    let el = e.target;
    if (el && el.scrollHeight - el.scrollTop === el.clientHeight) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  };

  const cardRender = (call, i) => {
    if (props.logs.length - 1 === i) {
      return <CardListItem log={call} filter={props.filter} open={true} />;
    } else {
      return <CardListItem log={call} filter={props.filter} open={false} />;
    }
  };

  useEffect(() => {
    if (listEndRef && listEndRef.current && atBottom) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.logs, atBottom]);

  return (
    <div
      id="cardList"
      style={{ width: "100%", height: "100%", position: "relative", overflowY: "scroll",}}
      onScroll={handleScroll}
    >
      {props.logs.map((call, i) => (
        cardRender(call, i)
      ))}
      <div ref={listEndRef}></div>
    </div>

  );
};

export default CardList;
