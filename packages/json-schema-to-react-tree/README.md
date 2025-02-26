# json-schema-to-react-tree

A react component to visually display JSON Schemas


![image](https://user-images.githubusercontent.com/364566/78064105-14144880-7346-11ea-9b42-b7158048cba9.png)


## Usage
`npm install @xops.net/json-schema-to-react-tree`

```
import React from "react";
import JSONSchemaTree from "@xops.net/json-schema-to-react-tree";

const MyApp = (props) => {
  return (
    <>
      <JSONSchemaTree
        schema={{
          type: "object",
          properties: {
            number: {
              type: "string",
            },
            hash: {
              type: "string",
            },
            timestamp: {
              description: "timestamp in which the block occured",
              title: "Timestamp",
              type: "string",
            },
            transactions: {
              type: "string",
            },
          },
        }} />
    </>
  )
}
export default MyApp;
```


### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
