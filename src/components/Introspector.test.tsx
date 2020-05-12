import React from "react";
import ReactDOM from "react-dom";
import Introspector from "./Introspector";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Introspector
    logs={
        [{
            timestamp: new Date(),
            payload: {
                jsonrpc: "2.0",
                method: "foo",
            },
        }]
    }
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
