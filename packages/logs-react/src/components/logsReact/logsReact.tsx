import React, { useState, useRef, useLayoutEffect } from "react";
import CardList from "../cardList/cardList";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

// add method type so we can attribute cards to different method calls
export interface IJSONRPCLog {
  type: "response" | "request";
  notification?: boolean;
  method: string;
  timestamp: Date;
  payload: any;
  batchId?: number;
}

type AlignString = "right" | "left";

interface IProps {
  logs: IJSONRPCLog[];
  openRecentPayload?: boolean;
  sidebarAlign?: AlignString;
  sidebarOpen?: boolean;
  openrpcDocument?: OpenrpcDocument;
}

const drawerWidth = 200;
const defaultOpenRecentPayload = false;
const defaultSidebarAlign: AlignString = "left";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logsReact: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
    extendDiv: {
      width: "25px",
    },
    hide: {
      display: "none",
    },
    menuButton: {
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    content: {
      width: "100%",
      height: "auto",
      overflow: "auto",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    left: {
      marginLeft: -drawerWidth,
    },
    right: {
      marginRight: -drawerWidth,
    },
    contentShift: {
      width: `100%`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginRight: 0,
    },
  }),
);

const JSONRPCLogger: React.FC<IProps> = (props) => {
  const cardEndRef = useRef(null);

  const [methodFilter] = useState(["all"]);
  const sidebarAlignment: AlignString = props.sidebarAlign !== undefined ? props.sidebarAlign : defaultSidebarAlign;
  const openRecentPayload = props.openRecentPayload !== undefined ? props.openRecentPayload : defaultOpenRecentPayload;
  const classes = useStyles();

  const scrollToBottom = () => {
    if (cardEndRef && cardEndRef.current !== null) {
      (cardEndRef.current as any).scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(scrollToBottom, [props.logs]);
  useLayoutEffect(scrollToBottom, []);

  return (
    <>
      { sidebarAlignment === "left" ?
        <div className={classes.logsReact}>
          <div className={clsx(classes.content, classes.left)}>
            <CardList
              logs={props.logs}
              filter={methodFilter}
              openRecentPayload={openRecentPayload}
            />
            <div ref={cardEndRef} />
          </div>
        </div>
        :
        <div className={classes.logsReact}>
          <div className={clsx(classes.content, classes.right)}>
            <CardList
              logs={props.logs}
              filter={methodFilter}
              openRecentPayload={openRecentPayload}
              openrpcDocument={props.openrpcDocument}
            />
            <div ref={cardEndRef} />
          </div>
        </div>
      }
    </>
  );
};

export default JSONRPCLogger;
