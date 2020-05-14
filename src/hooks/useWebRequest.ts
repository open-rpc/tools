import React, { useEffect, useState } from "react";
import {IJSONRPCLog} from "../components/Introspector";

const useWebRequest = () => {
    const [history, setHistory] = useState<any>([]);

    if(chrome && chrome.webRequest) {
        chrome.devtools.network.onRequestFinished.addListener(request => {
            var requestBody = request.request.postData?.text;
            request.getContent((responseBody) => {
                if (request.request && request.request.url && requestBody) {
                    try {
                        var requestObj = JSON.parse(requestBody);                        
                        var responseObj = JSON.parse(responseBody);
                        if('jsonrpc' in requestObj) {
                            const logObj: IJSONRPCLog = {
                                timestamp: new Date(request.startedDateTime),
                                payload: requestObj
                            }
                            setHistory(history.concat(logObj))
                        }
                        if('jsonrpc' in responseObj) {
                            const logObj: IJSONRPCLog = {
                                timestamp: new Date(request.startedDateTime),
                                payload: responseObj
                            }
                            setHistory(history.concat(logObj))
                        }
                    } catch (e) { }                   
                }
            });
          });
    }
    return [history];
}

export default useWebRequest;