import * as React from "react";
import { useState, useRef, useLayoutEffect } from "react";
import CardList from "../cardList/cardList";
import clsx from "clsx";
import {  Theme, styled } from "@mui/material/styles";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
//import '../../utils/monacoWorker';

const PREFIX = 'JSONRPCLogger';

const classes = {
  logsReact: `${PREFIX}-logsReact`,
  extendDiv: `${PREFIX}-extendDiv`,
  hide: `${PREFIX}-hide`,
  menuButton: `${PREFIX}-menuButton`,
  content: `${PREFIX}-content`,
  left: `${PREFIX}-left`,
  right: `${PREFIX}-right`,
  contentShift: `${PREFIX}-contentShift`
};

const drawerWidth = 200;

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  { theme }: { theme: Theme }
) => ({
  [`& .${classes.logsReact}`]: {
    display: "flex",
    width: "100%",
    height: "100%",
  },

  [`& .${classes.extendDiv}`]: {
    width: "25px",
  },

  [`& .${classes.hide}`]: {
    display: "none",
  },

  [`& .${classes.menuButton}`]: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },

  [`& .${classes.content}`]: {
    width: "100%",
    height: "auto",
    overflow: "auto",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  [`& .${classes.left}`]: {
    marginLeft: -drawerWidth,
  },

  [`& .${classes.right}`]: {
    marginRight: -drawerWidth,
  },

  [`& .${classes.contentShift}`]: {
    width: `100%`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginRight: 0,
  }
}));

// add method type so we can attribute cards to different method calls
export interface IJSONRPCLog {
  type: "response" | "request";
  notification?: boolean;
  method: string;
  timestamp: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  darkMode?: boolean;
  children?: React.ReactNode;
}

const defaultOpenRecentPayload = false;
const defaultSidebarAlign: AlignString = "left";

export const JSONRPCLogger: React.FC<IProps> = (props) => {
  const cardEndRef = useRef(null);

  const [methodFilter] = useState(["all"]);
  const sidebarAlignment: AlignString = props.sidebarAlign !== undefined ? props.sidebarAlign : defaultSidebarAlign;
  const openRecentPayload = props.openRecentPayload !== undefined ? props.openRecentPayload : defaultOpenRecentPayload;


  const scrollToBottom = () => {
    if (cardEndRef && cardEndRef.current !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cardEndRef.current as any).scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(scrollToBottom, [props.logs]);
  useLayoutEffect(scrollToBottom, []);

  return (
    <Root>
      { sidebarAlignment === "left" ?
        <div className={classes.logsReact}>
          <div className={clsx(classes.content, classes.left)}>
            <CardList
              logs={props.logs}
              filter={methodFilter}
              openRecentPayload={openRecentPayload}
              openrpcDocument={props.openrpcDocument}
              darkMode={props.darkMode}
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
              darkMode={props.darkMode}
            />
            <div ref={cardEndRef} />
          </div>
        </div>
      }
    </Root>
  );
};

