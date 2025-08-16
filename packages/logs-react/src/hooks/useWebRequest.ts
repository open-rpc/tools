import { useState, useEffect, Dispatch } from 'react';
import { IJSONRPCLog } from '../components/logsReact/logsReact';

let batchIdCount = 0;

// checks if the passed string is a JSON-RPC request or response
const isJsonRpc = (str: string) => {
  try {
    const json = JSON.parse(str);
    if (json) {
      // Currently on returns batched request if all items are JSONRPC calls
      if (json.length > 0) {
        for (const obj of json) {
          if (!('jsonrpc' in obj)) {
            return false;
          }
        }
        return true;
      } else if ('jsonrpc' in json) {
        return true;
      } else {
        return false;
      }
    }
    return false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    return false;
  }
};

const useWebRequest = (): [IJSONRPCLog[], Dispatch<IJSONRPCLog[]>] => {
  const [history, setHistory] = useState<IJSONRPCLog[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listener = (request: any) => {
    const requestBody = request.request.postData?.text;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request.getContent((responseBody: any) => {
      if (
        request.request &&
        request.request.url &&
        requestBody &&
        isJsonRpc(requestBody) &&
        isJsonRpc(responseBody)
      ) {
        const requestBodyObj = JSON.parse(requestBody);
        const requestObjs: IJSONRPCLog[] = [];
        const responseObjs: IJSONRPCLog[] = [];
        // if batched
        if (requestBodyObj.length) {
          for (const reqObj of requestBodyObj) {
            requestObjs.push({
              type: 'request',
              method: reqObj.method,
              timestamp: new Date(request.startedDateTime),
              payload: reqObj,
              batchId: batchIdCount,
            });
          }
          batchIdCount += 1;
        } else {
          requestObjs.push({
            type: 'request',
            method: requestBodyObj.method,
            timestamp: new Date(request.startedDateTime),
            payload: requestBodyObj,
          });
        }

        const responseTime = new Date(request.startedDateTime);
        const responseBodyObj = JSON.parse(responseBody);
        responseTime.setMilliseconds(responseTime.getMilliseconds() + request.time);
        // if batched
        if (responseBodyObj.length) {
          responseBodyObj.forEach((resObj, j) => {
            responseObjs.push({
              type: 'response',
              method: requestBodyObj[j].method,
              timestamp: responseTime,
              payload: resObj,
              batchId: batchIdCount,
            });
          });
          batchIdCount += 1;
        } else {
          responseObjs.push({
            type: 'response',
            method: requestBodyObj.method,
            timestamp: responseTime,
            payload: responseBodyObj,
          });
        }
        setHistory((prevHistory) => [...prevHistory, ...requestObjs, ...responseObjs]);
      }
    });
  };

  useEffect(() => {
    const devToolsNetwork =
      typeof chrome !== 'undefined' && chrome.devtools && chrome.devtools.network
        ? chrome.devtools.network
        : typeof browser !== 'undefined' && browser.devtools && browser.devtools.network
          ? browser.devtools.network
          : null;

    if (devToolsNetwork) {
      devToolsNetwork.onRequestFinished.addListener(listener);
    }

    return function cleanup() {
      if (devToolsNetwork) {
        devToolsNetwork.onRequestFinished.removeListener(listener);
      }
    };
  }, []);

  return [history, setHistory];
};

export default useWebRequest;
