import React, {useState} from "react";
import CardList from "./cardList";
import MethodList from "./methodList";
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

// TODO support custom filters
// Returns array of method names
const getMethods = (logs: IJSONRPCLog[]) => {
	var methods = ["all"];
	for(var x = 0; x < logs.length; x++) {
		if(!methods.includes(logs[x].method)) {
			methods.push(logs[x].method);
		}
	}
	return methods;
};

const JSONRPCLogger: React.FC<IProps> = (props) => {

	const methods = getMethods(props.logs);
	const [methodFilter, setFilter] = useState("all");

	const methodClick = (method: string) => {
		setFilter(method);
		return;
	};

    return (
		<div className="logs-react">
			<div className="scrollable sidebar">
				<MethodList methods={methods} select={methodClick}/>
			</div>
			<div className="content">
				<CardList logs={props.logs} filter={methodFilter} />
			</div>
		</div>
    );
};

export default JSONRPCLogger;
