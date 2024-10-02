# Logs-React

## What is Logs-React?

This project is a React Component that displays a list of JSON-RPC Requests and Responses.

## Features:

* Displays Requests and Responses in a time-series format
* Supports JSON-RPC Notifications

## How do I use this?

##### Installation:
```
npm install --save @open-rpc/logs-react
```
##### Usage:
```
import JSONRPCLogger, {JSONRPCLog} from "@open-rpc/logs-react";

// Get these logs how ever you want
const logs: JSONRPCLog[] = [{
    type: "request",
    method: "test",
    timestamp: new Date(),
    payload: {
        jsonrpc: "2.0",
        method: "foo"
    }
}];

<JSONRPCLogger logs={logs} />
```

##### Props:

| Name              | Type              | Function                                                                                            |
|-------------------|-------------------|-----------------------------------------------------------------------------------------------------|
| logs              | JSONRPCLog        | The list of JSON-RPC calls that logs-react will display                                             |
| openRecentPayload | boolean           | Default: false. If true, the payload of the most recent response will be expanded automatically.    |
| sidebarAlign      | "left" or "right" | Default: "left". Determines which side of the screen that the method filter sidebar will appear on. |
| sidebarOpen       | boolean           | Default: true. If true, the filter sidebar will be opened by default, if false it will be closed.   |

##### Example in a new project:

###### create a new typescript project with `create-react-app`

```
npx create-react-app <appname> --typescript
```

```
cd <appname>
npm install .
npm install @open-rpc/logs-react --save
```

###### index.ts
```
import React from 'react';
import ReactDOM from 'react-dom';
import JSONRPCLogger, {JSONRPCLog} from "@open-rpc/logs-react";

const logs: JSONRPCLog[] = [{
    type: "request",
    method: "test",
    timestamp: new Date(),
    payload: {
        jsonrpc: "2.0",
        method: "foo"
    }
}];

ReactDOM.render(<JSONRPCLogger logs={logs} />, document.getElementById("root"));

```

### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
