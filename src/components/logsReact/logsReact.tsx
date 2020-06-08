import React, {useState} from "react";
import CardList from "../cardList/cardList";
import MethodList from "../methodList/methodList";
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

	const methodClick = (method: string[]) => {
		setFilter(method);
		return;
	};

	return (
		<div className="logs-react">
			<div className="scrollable sidebar">
				<MethodList logs={props.logs} active={methodFilter} select={methodClick}/>
			</div>
			<div className="content">
				<CardList logs={props.logs} filter={methodFilter} />
			</div>
		</div>
	);
};

export default JSONRPCLogger;
