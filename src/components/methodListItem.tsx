import React from "react";
import "./methodListItem.css";
import useDarkMode from "use-dark-mode";

interface IProps {
	method: string;
	select: any;
}

const MethodListItem: React.FC<IProps> = (props) => {

	const darkMode = useDarkMode();
	return (
		<div key={props.method} onClick={() => props.select(props.method)}
		  className={["method-list-item",`${ darkMode.value ? "dark" : "light"}`].join(" ")}>
			<div className="method-info">
				<h1 className="method-title">{props.method}</h1>
			</div>
		</div>
  	);
};

export default MethodListItem;
