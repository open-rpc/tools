import React from "react";
import { Button, Tooltip } from "@mui/material";
//import { IMethodPluginProps } from "@open-rpc/docs-react/dist/Methods/Methods";
import searchBarStore from "../stores/searchBarStore";
import { MethodObject } from "@open-rpc/meta-schema";
import { ExamplePairingObject, ExampleObject } from "@open-rpc/meta-schema";
import useInspectorActionStore from "../stores/inspectorActionStore";
export type TParamStructure = "either" | "by-name" | "by-position";

interface IMethodPluginProps {
  openrpcMethodObject: MethodObject;
}

const InspectorPlugin: React.FC<IMethodPluginProps> = (props) => {
  const [searchUrl] = searchBarStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setInspectorContents] = useInspectorActionStore() as any;
  const method = props.openrpcMethodObject;
  const examplePosition = 0;
  let example;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let exampleParams: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let emptyParams = [] as any;


if (method && method.examples && method.examples[examplePosition]) {
    example = method.examples[examplePosition] as ExamplePairingObject;
    const paramStructure: TParamStructure = method.paramStructure || "either";
    exampleParams = paramStructure === "by-name"
      ? (example.params as ExampleObject[]).reduce(((memo, p) => {
        memo[p.name] = p.value;
        return memo;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }), {} as any)
      : (example.params as ExampleObject[]).map(((p) => p.value));
  }
  if (method && method.paramStructure === "by-name") {
    emptyParams = {};
  }

  const handleClick = () => {
   setInspectorContents({
    url: searchUrl,
    openrpcMethodObject: props.openrpcMethodObject,
    request: {
      jsonrpc: "2.0",
      method: method.name,
      params: exampleParams || emptyParams,
      id: 0,
    },
    });
  };

  return (
    <Tooltip title="Try It">
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        size="small"
        sx={{ marginLeft: 1 }}
      >
        <span role="img" aria-label="try-it-inspector">🕵️‍♂️</span>️️ Try It Now
      </Button>
    </Tooltip>
  );
};

export default InspectorPlugin;
