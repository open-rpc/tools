import React from "react";
import MethodListItem from "./methodListItem";
import "./methodList.css"

interface IProps {
	methods: string[];
	select: any;
}

//TODO button to hide
const MethodList: React.FC<IProps> = (props) => {
  return (
	<div className="method-list">
		{props.methods.map((method) => (
			<MethodListItem key={method} method={method} select={props.select}/>
		))}
	</div>
  );
};

export default MethodList;
