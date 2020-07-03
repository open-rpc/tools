import React, { useState } from "react";
import CardList from "../cardList/cardList";
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MethodList from "../methodList/methodList";
import { IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// add method type so we can attribute cards to different method calls
export interface IJSONRPCLog {
  type: "response" | "request";
  method: string;
  timestamp: Date;
  payload: any;
}

interface IProps {
  logs: IJSONRPCLog[];
}

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logsReact: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
    extendDiv: {
      width: "15px",
    },
    hide: {
      display: 'none',
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
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const JSONRPCLogger: React.FC<IProps> = (props) => {

  const [methodFilter, setFilter] = useState(["all"]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const classes = useStyles();

  const methodClick = (method: string[]) => {
    setFilter(method);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  return (
    <div className={classes.logsReact}>
      <div className={clsx(classes.extendDiv, drawerOpen && classes.hide)}>
        <IconButton
          aria-label="open filters"
          onClick={handleDrawerOpen}
          className={classes.menuButton}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <MethodList
        logs={props.logs}
        active={methodFilter}
        select={methodClick}
        isDrawerOpen={drawerOpen}
        closeDrawer={handleDrawerClose}
      />
      <div className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}>
        <CardList logs={props.logs} filter={methodFilter} />
      </div>
    </div>
  );
};

export default JSONRPCLogger;
