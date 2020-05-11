import React from "react";
export interface JSONRPCLog {
    timestamp: Date;
    payload: any;
}
interface IProps {
    logs: JSONRPCLog[];
}
declare const Introspector: React.FC<IProps>;
export default Introspector;
