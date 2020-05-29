import { useState, useEffect } from "react";
import { IJSONRPCLog } from "../components/logs-react";

// checks if the passed string is a JSON-RPC request or response
const isJsonRpc = (str: string) => {
	try {
		if ("jsonrpc" in JSON.parse(str)) {
			return true;
		}
		return false;
	} catch (e) {
		return false;
	}
};

const useWebRequest = () => {
    const [history, setHistory] = useState<IJSONRPCLog[]>([]);
    const listener = (request) => {
		const requestBody = request.request.postData?.text;
		request.getContent((responseBody) => {
			if (request.request && request.request.url && requestBody
			&& isJsonRpc(requestBody) && isJsonRpc(responseBody)) {
				const requestBodyObj = JSON.parse(requestBody);
				const requestObj: IJSONRPCLog = {
					type: "request",
					method: requestBodyObj.method,
					timestamp: new Date(request.startedDateTime),
					payload: requestBodyObj,
				};
				const responseTime = new Date(request.startedDateTime);
				responseTime.setMilliseconds((responseTime.getMilliseconds() + request.time));
				const responseObj: IJSONRPCLog = {
					type: "response",
					method: requestBodyObj.method,
					timestamp: responseTime,
					payload: JSON.parse(responseBody),
				};
				setHistory((prevHistory) => [...prevHistory, requestObj, responseObj]);
			}
		});
  	};
	useEffect(() => {
		if (chrome && chrome.webRequest) {
			chrome.devtools.network.onRequestFinished.addListener(listener);
		}
		return function cleanup() {
			chrome.devtools.network.onRequestFinished.removeListener(listener);
		};
	}, []);

  	return [history];
};

export default useWebRequest;
