import { useState } from "react";
import {IJSONRPCLog} from "../components/logs-react";

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

    if (chrome && chrome.webRequest) {
        chrome.devtools.network.onRequestFinished.addListener((request) => {
            const requestBody = request.request.postData?.text;
            request.getContent((responseBody) => {
                if (request.request && request.request.url && requestBody
                    && isJsonRpc(requestBody) && isJsonRpc(responseBody)) {
                    const requestObj: IJSONRPCLog = {
                        timestamp: new Date(request.startedDateTime),
                        payload: JSON.parse(requestBody),
                    };

                    const responseObj: IJSONRPCLog = {
                        timestamp: new Date(request.startedDateTime),
                        payload: JSON.parse(responseBody),
                    };
                    setHistory(history.concat([requestObj, responseObj]));
                }
            });
          });
    }
    return [history];
};

export default useWebRequest;
