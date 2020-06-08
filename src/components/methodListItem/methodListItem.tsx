import React from "react";
import "./methodListItem.css";
import useDarkMode from "use-dark-mode";

interface IProps {
	filter: string[];
	active: boolean;
	select: any;
}

const MethodListItem: React.FC<IProps> = (props) => {

	const darkMode = useDarkMode();
	const filterString = props.filter.join(", ");

	return (
		<div key={filterString} onClick={() => props.select(props.filter)}
		  	className={["method-list-item",
		  	`${ darkMode.value ? "dark" : "light"}`,
		  	`${ props.active ? "active" : ""}`].join(" ")}
		>
			<div className="method-info">
				<h1 className="method-title">{filterString}</h1>
			</div>
		</div>
  	);
};

export default MethodListItem;
