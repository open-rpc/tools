import React, { useState } from "react";
import CardList from "../cardList/cardList";
import MethodList from "../methodList/methodList";
import { Slide, FormControlLabel, Switch, AppBar, Toolbar} from "@material-ui/core";
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

const JSONRPCLogger: React.FC<IProps> = (props) => {

  const [methodFilter, setFilter] = useState(["all"]);
  const [checked, setChecked] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const methodClick = (method: string[]) => {
    setFilter(method);
  };

  const handleHide = () => {
    setChecked((prev) => !prev);
    // Delay column style change until animation complete
    if (checked) {
      setTimeout(() => setFullScreen((prev) => !prev), 400);
    } else {
      setFullScreen((prev) => !prev);
    }

  }

  return (
    <div className={["logs-react", `${fullScreen ? "full-screen" : ""}`].join(" ")}>
      <Slide
        direction="right"
        in={checked}
        mountOnEnter
        unmountOnExit={false}
        {...(checked ? {timeout: 400} : {})}
      >
        <div className="scrollable sidebar">
          <MethodList logs={props.logs} active={methodFilter} select={methodClick} />
        </div>
      </Slide>
      <div className="content">
        <CardList logs={props.logs} filter={methodFilter} />
      </div>
      <AppBar position="fixed" style={{top: "auto", bottom: 0}}>
        <Toolbar>
          <FormControlLabel
            control={<Switch onChange={handleHide} checked={checked} />}
            label="Show Filters"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default JSONRPCLogger;
