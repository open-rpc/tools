import React from "react";
import ReactDOM from "react-dom";
import ExamplePairings from "./ExamplePairings";
import examples from "@open-rpc/examples";
import refParser from "json-schema-ref-parser";
import { OpenrpcDocument, ExamplePairingObject, MethodObject } from "@open-rpc/meta-schema";
import {
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";

const isMethodObject = (method: any): method is MethodObject => {
  return method && 
    typeof method === "object" && 
    "name" in method && 
    "params" in method;
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairings />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no example", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairings />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty example", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairings examples={[]} />, div);
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
    <ExamplePairings
      method={method}
      examples={method.examples as ExamplePairingObject[]}
    />, div);
  expect(div.innerHTML.includes("simpleMathAdditionTwo")).toBe(true);
  expect(div.innerHTML.includes("2")).toBe(true);
  expect(div.innerHTML.includes("4")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with only schema examples", async () => {
  const div = document.createElement("div");
  const testDoc: OpenrpcDocument = {
    info: {
      title: "test",
      version: "0.0.0",
    },
    methods: [
      {
        name: "test",
        params: [
          {
            name: "testParam",
            schema: {
              examples: ["test"],
              type: "string" as const,
            },
          },
        ],
        result: {
          name: "test",
          schema: {
            examples: ["test"],
            type: "string" as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: "1.0.0",
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairings
      method={method}
      examples={method.examples as ExamplePairingObject[]}
    />, div);
  expect(div.innerHTML.includes("test")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with only schema examples with no params", async () => {
  const div = document.createElement("div");
  const testDoc: OpenrpcDocument = {
    info: {
      title: "test",
      version: "0.0.0",
    },
    methods: [
      {
        name: "test-method",
        params: [],
        result: {
          name: "test-method-result",
          schema: {
            examples: ["potato"],
            type: "string" as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: "1.0.0",
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairings
      method={method}
      examples={method.examples as ExamplePairingObject[]}
    />, div);
  expect(div.innerHTML.includes("potato")).toBe(true);
  expect(div.innerHTML.includes("bob")).toBe(false);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with multiple param schema examples and no method", async () => {
  const div = document.createElement("div");
  const testDoc: OpenrpcDocument = {
    info: {
      title: "test",
      version: "0.0.0",
    },
    methods: [
      {
        name: "test-method",
        params: [
          {
            name: "testparam1",
            schema: {
              examples: ["bob"],
              type: "string" as const,
            },
          },
          {
            name: "testparam2",
            schema: {
              examples: ["bob2"],
              type: "string" as const,
            },
          },
        ],
        result: {
          name: "test-method-result",
          schema: {
            examples: ["potato"],
            type: "string" as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: "1.0.0",
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairings method={method} />
    , div);
  expect(div.innerHTML.includes("bob")).toBe(true);
  expect(div.innerHTML.includes("bob2")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with only schema examples and no method", async () => {
  const div = document.createElement("div");
  const testDoc: OpenrpcDocument = {
    info: {
      title: "test",
      version: "0.0.0",
    },
    methods: [
      {
        name: "test-method",
        params: [{
          name: "testparam1",
          schema: {
            examples: ["bob"],
            type: "string" as const,
          },
        }],
        result: {
          name: "test-method-result",
          schema: {
            examples: ["potato"],
            type: "string" as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: "1.0.0",
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairings
      examples={method.examples as ExamplePairingObject[]}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with only schema examples and no method with number", async () => {
  const div = document.createElement("div");
  const testDoc: OpenrpcDocument = {
    info: {
      title: "test",
      version: "0.0.0",
    },
    methods: [
      {
        name: "test-method",
        params: [{
          name: "testparam1",
          schema: {
            examples: [10101],
            type: "number" as const,
          },
        }],
        result: {
          name: "test-method-result",
          schema: {
            examples: ["potato"],
            type: "string" as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: "1.0.0",
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairings
      examples={method.examples as ExamplePairingObject[]}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with only schema examples and no method with multiple number examples", async () => {
  const div = document.createElement("div");
  const testDoc: OpenrpcDocument = {
    info: {
      title: "test",
      version: "0.0.0",
    },
    methods: [
      {
        name: "test-method",
        params: [{
          name: "testparam1",
          schema: {
            examples: [10101, 102],
            type: "number" as const,
          },
        }],
        result: {
          name: "test-method-result",
          schema: {
            examples: ["potato", "bar"],
            type: "string" as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: "1.0.0",
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairings
      examples={method.examples as ExamplePairingObject[]}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples and can switch between them", async () => {
  const simpleMath = await refParser.dereference(examples.simpleMath) as OpenrpcDocument;
  const method = simpleMath.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  const { getByText } = render(
    <ExamplePairings
      method={method}
      examples={method.examples as ExamplePairingObject[]}
    />
  );
  const node = getByText("simpleMathAdditionTwo");
  fireEvent.click(node);
  const secondExampleMenuItem = getByText("simpleMathAdditionFour");
  fireEvent.click(secondExampleMenuItem);
  const example8 = getByText("8");
  expect(example8).toBeDefined();
  cleanup();
});

it("renders examples by-name", async () => {
  const div = document.createElement("div");
  const petstoreByName = await refParser.dereference(examples.petstoreByName) as OpenrpcDocument;
  const method = petstoreByName.methods[0];
  if (!isMethodObject(method)) {
    throw new Error("Expected method to be a MethodObject");
  }
  ReactDOM.render(
    <ExamplePairings
      method={method}
      examples={method.examples as ExamplePairingObject[]}
    />, div);
  expect(div.innerHTML).toContain("listPetExample");
  expect(div.innerHTML).toContain("limit");
  expect(div.innerHTML).toContain("1");
  ReactDOM.unmountComponentAtNode(div);
});
