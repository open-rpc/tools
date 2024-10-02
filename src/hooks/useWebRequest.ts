import { useState, useEffect, Dispatch } from "react";
import { IJSONRPCLog } from "../components/logsReact/logsReact";

let batchIdCount = 0;

// checks if the passed string is a JSON-RPC request or response
const isJsonRpc = (str: string) => {
  try {
    const json = JSON.parse(str);
    if (json) {
      // Currently on returns batched request if all items are JSONRPC calls
      if (json.length > 0) {
        for (const obj of json) {
          if (!("jsonrpc" in obj)) {
            return false;
          }
        }
        return true;
      } else if ("jsonrpc" in json) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (e) {
    return false;
  }
};

const useWebRequest = (): [IJSONRPCLog[], Dispatch<IJSONRPCLog[]>] => {
  const [history, setHistory] = useState<IJSONRPCLog[]>([]);
  const listener = (request) => {
    const requestBody = request.request.postData?.text;
    request.getContent((responseBody) => {
      if (request.request && request.request.url && requestBody
        && isJsonRpc(requestBody) && isJsonRpc(responseBody)) {
        const requestBodyObj = JSON.parse(requestBody);
        const requestObjs: IJSONRPCLog[] = [];
        const responseObjs: IJSONRPCLog[] = [];
        // if batched
        if (requestBodyObj.length) {
          for (const [reqObj] of requestBodyObj) {
            requestObjs.push(
              {
                type: "request",
                method: reqObj.method,
                timestamp: new Date(request.startedDateTime),
                payload: reqObj,
                batchId: batchIdCount,
              },
            );
          }
          batchIdCount += 1;
        } else {
          requestObjs.push(
            {
              type: "request",
              method: requestBodyObj.method,
              timestamp: new Date(request.startedDateTime),
              payload: requestBodyObj,
            },
          );
        }

        const responseTime = new Date(request.startedDateTime);
        const responseBodyObj = JSON.parse(responseBody);
        responseTime.setMilliseconds((responseTime.getMilliseconds() + request.time));
        // if batched
        if (responseBodyObj.length) {
          for (const [j, resObj] of responseBodyObj) {
            responseObjs.push(
              {
                type: "response",
                method: requestBodyObj[j].method,
                timestamp: responseTime,
                payload: resObj,
                batchId: batchIdCount,
              },
            );
          }
          batchIdCount += 1;
        } else {
          responseObjs.push(
            {
              type: "response",
              method: requestBodyObj.method,
              timestamp: responseTime,
              payload: responseBodyObj,
            },
          );

        }
        setHistory((prevHistory) => [...prevHistory, ...requestObjs, ...responseObjs]);
      }
    });
  };
  useEffect(() => {
    if (chrome && chrome.webRequest) {
      chrome.devtools.network.onRequestFinished.addListener(listener);
    }
    return function cleanup() {
      if (chrome && chrome.webRequest) {
        chrome.devtools.network.onRequestFinished.removeListener(listener);
      }
    };
  }, []);

  return [history, setHistory];
};

export default useWebRequest;
