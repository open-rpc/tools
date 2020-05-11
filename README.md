# Introspector

<center>
  <span>
    <img alt="CircleCI branch" src="https://img.shields.io/circleci/project/github/open-rpc/introspector/master.svg">
    <img src="https://codecov.io/gh/open-rpc/introspector/branch/master/graph/badge.svg" />
    <img alt="Dependabot status" src="https://api.dependabot.com/badges/status?host=github&repo=open-rpc/introspector" />
    <img alt="npm" src="https://img.shields.io/npm/dt/@open-rpc/introspector.svg" />
    <img alt="GitHub release" src="https://img.shields.io/github/release/open-rpc/introspector.svg" />
    <img alt="GitHub commits since latest release" src="https://img.shields.io/github/commits-since/open-rpc/introspector/latest.svg" />
    <img alt="js badge" src="https://img.shields.io/badge/js-javascript-yellow.svg" />
    <img alt="rs badge" src="https://img.shields.io/badge/rs-rust-brown.svg" />
  </span>
</center>

## What is Introspector?

This project is a React Component that displays a list of JSON-RPC Requests and Responses.

## Features:

* Displays Requests and Responses in a time-series format
* Supports JSON-RPC Notifications

## How do I use this?

##### Installation:
```
npm install --save @open-rpc/introspector
```
##### Usage:
```
import Introspector, {JSONRPCLog} from "@open-rpc/introspector";

// Get these logs how ever you want
const logs: JSONRPCLog[] = [{
    timestamp: new Date(),
    payload: {
        jsonrpc: "2.0",
        method: "foo"
    }
}];

<Introspector logs={logs} />
```

##### Example in a new project:

###### create a new typescript project with `create-react-app`

```
npx create-react-app <appname> --typescript
```

```
cd <appname>
npm install .
npm install @open-rpc/introspector --save
```

###### index.ts
```
import React from 'react';
import ReactDOM from 'react-dom';
import Introspector, {JSONRPCLog} from "@open-rpc/introspector";

const logs: JSONRPCLog[] = [{
    timestamp: new Date(),
    payload: {
        jsonrpc: "2.0",
        method: "foo"
    }
}];

ReactDOM.render(<Introspector logs={logs} />, document.getElementById("root"));

```

### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
