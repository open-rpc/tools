import React, { useState } from "react";
import CardList from "../cardList/cardList";
import clsx from 'clsx';
import MethodList from "../methodList/methodList";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import "./logsReact.css";

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
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    content: {
      width: "100%",
      height: "auto",
      marginTop: "6%",
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
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
    <div className="logs-react">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap color="primary">
            JSON-RPC Logger
          </Typography>
        </Toolbar>
      </AppBar>
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
