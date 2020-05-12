import React, { useEffect, useState } from "react";


const useWebRequest = () => {
    const [history, setHistory] = useState<any>([]);

    if(chrome && chrome.webRequest) {
        chrome.devtools.network.onRequestFinished.addListener(request => {
            request.getContent((body) => {
                if (request.request && request.request.url) {
                    //continue with custom code
                    var bodyObj = JSON.parse(body);//etc.
                    setHistory([...history, bodyObj])
                }
            });
          });
    }
    return [history];
}

export default useWebRequest;