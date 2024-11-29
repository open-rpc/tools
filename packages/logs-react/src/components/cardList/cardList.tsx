import React from "react";
import { IJSONRPCLog } from "../logsReact/logsReact";
import CardListItem from "../cardListItem/cardListItem";
import "./cardList.css";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

interface IProps {
  logs: IJSONRPCLog[];
  filter: string[];
  openRecentPayload: boolean;
  openrpcDocument?: OpenrpcDocument;
}

const CardList: React.FC<IProps> = (props) => {
  return (
    <>
      {props.logs.map((call, i) => {
        if (props.logs.length - 1 === i) {
          return (
            <CardListItem
              key={`log-${i}`}
              openrpcDocument={props.openrpcDocument}
              log={call}
              filter={props.filter}
              open={true}
            />
          );
        } else {
          return (
            <CardListItem
              key={`log-${i}`}
              openrpcDocument={props.openrpcDocument}
              log={call}
              filter={props.filter}
              open={false}
            />
          );
        }
      })}
    </>
  );
};

export default CardList;
