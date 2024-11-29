import React from "react";
import ReactDOM from "react-dom";
import ExamplePairing from "./ExamplePairing";
import examples from "@open-rpc/examples";
import refParser from "json-schema-ref-parser";
import { OpenrpcDocument, ExamplePairingObject, MethodObject } from "@open-rpc/meta-schema";

const isMethodObject = (method: any): method is MethodObject => {
  return method && 
    typeof method === "object" && 
    "name" in method && 
    "params" in method;
};

it("renders handles no method", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairing methodName={undefined} examplePairing={{} as any} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders handles no method examples", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairing methodName={"foo"} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples", async () => {
  const div = document.createElement("div");
  const simpleMath = await refParser.dereference(examples.simpleMath) as OpenrpcDocument;
  const method = simpleMath.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairing
      methodName={method.name}
      examplePairing={method.examples && method.examples[0] as any}
    />, div);
  expect(div.innerHTML.includes("2")).toBe(true);
  expect(div.innerHTML.includes("4")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with params by-name", async () => {
  const div = document.createElement("div");
  const method: MethodObject = {
    examples: [
      {
        name: "fooExample",
        params: [
          {
            name: "foo",
            value: "bar",
          },
        ],
        result: {
          name: "exampleResultThing",
          value: "potato",
        },
      },
    ],
    name: "myMethod",
    paramStructure: "by-name",
    params: [{
      name: "foo",
      schema: {
        type: "string" as const,
      },
    }],
    result: {
      name: "resultThing",
      schema: {
        type: "string" as const,
      },
    },
  };
  ReactDOM.render(
    <ExamplePairing
      methodName={method.name}
      examplePairing={method.examples && method.examples[0] as ExamplePairingObject}
      paramStructure={method.paramStructure || "by-position"} />
    , div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
