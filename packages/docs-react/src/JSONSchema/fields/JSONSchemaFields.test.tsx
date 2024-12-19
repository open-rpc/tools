import { it, expect } from 'vitest';
import React from "react";
import JSONSchemaFields from "./JSONSchemaFields";
import { JSONSchema4 } from "json-schema";
import { render, screen } from '@testing-library/react';

it("renders empty with no schema", () => {
  render(<JSONSchemaFields />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty schema", () => {
  render(<JSONSchemaFields schema={{}} />);
  expect(document.body.textContent).toBe("");
});

it("renders with a schema", () => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      tag: { type: "string" },
    },
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("name")).toBeInTheDocument();
  expect(screen.getAllByText("string")).toHaveLength(2);
  expect(screen.getByText("tag")).toBeInTheDocument();
});

it("renders with a schema required", () => {
  const schema = {
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("true")).toBeInTheDocument();
});

it("renders with a schema without required", () => {
  const schema = {
    properties: {
      name: { type: "string" },
    },
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("false")).toBeInTheDocument();
});

it("renders with a nested schema object", () => {
  const schema = {
    properties: {
      name: {
        type: "object",
        properties: {
          foo: {
            type: "string"
          }
        }
      },
    },
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getByText("string")).toBeInTheDocument();
  expect(screen.getAllByText("object")).toHaveLength(2);
});

it("renders with a anyOf with nested objects", () => {
  const schema = {
    anyOf: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: { type: "string" }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: { type: "string" }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getByText("bar")).toBeInTheDocument();
  expect(screen.getByText("baz")).toBeInTheDocument();
  expect(screen.getByText("potato")).toBeInTheDocument();
});

it("renders with a allOf with nested objects", () => {
  const schema = {
    allOf: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getByText("bar")).toBeInTheDocument();
  expect(screen.getByText("baz")).toBeInTheDocument();
  expect(screen.getByText("potato")).toBeInTheDocument();
});


it("renders with a oneOf with nested objects", () => {
  const schema = {
    oneOf: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getByText("bar")).toBeInTheDocument();
  expect(screen.getByText("baz")).toBeInTheDocument();
  expect(screen.getByText("potato")).toBeInTheDocument();
});

it("renders with a nested arrays of objects", () => {
  const schema = {
    title: "MyPotatoObject",
    type: "array",
    items: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: { type: "string" }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getByText("bar")).toBeInTheDocument();
  expect(screen.getByText("baz")).toBeInTheDocument();
  expect(screen.getByText("potato")).toBeInTheDocument();
  expect(screen.getAllByText("string")).toHaveLength(2);
  expect(screen.getByText("MyPotatoObject")).toBeInTheDocument();
});

it("renders with a nested arrays of object", () => {
  const schema = {
    title: "MyPotatoObject",
    type: "array",
    items: {
      title: "foo",
      properties: {
        name: {
          type: "object",
          properties: {
            potato: {
              type: "string"
            }
          }
        },
      },
    }
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getAllByText("object")).toHaveLength(2);
  expect(screen.getByText("potato")).toBeInTheDocument();
  expect(screen.getByText("string")).toBeInTheDocument();
  expect(screen.getByText("MyPotatoObject")).toBeInTheDocument();
});

it("renders with a nested arrays of object with name passed explicitly", () => {
  const schema = {
    type: "array",
    items: {
      title: "foo",
      properties: {
        name: {
          type: "object",
          properties: {
            potato: {
              type: "string"
            }
          }
        },
      },
    }
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} name={"My Name"} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getAllByText("object")).toHaveLength(2);
  expect(screen.getByText("potato")).toBeInTheDocument();
  expect(screen.getByText("string")).toBeInTheDocument();
  expect(screen.getByText("My Name")).toBeInTheDocument();
});

it("renders with a nested arrays of objects with name passed explicitly", () => {
  const schema = {
    type: "array",
    items: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} name={"My Name"} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getAllByText("object")).toHaveLength(2);
  expect(screen.getByText("potato")).toBeInTheDocument();
  expect(screen.getByText("string")).toBeInTheDocument();
  expect(screen.getByText("My Name")).toBeInTheDocument();
});

it("renders with a nested oneOf with nested allOf", () => {
  const schema = {
    title: "MyPotatoObject",
    oneOf: [
      {
        title: "Apple",
        allOf: [
          {
            title: "Banana",
            type: "string"
          },
          {
            title: "Pear",
            type: "string"
          },
        ]
      }
    ]
  } as JSONSchema4;
  
  render(<JSONSchemaFields schema={schema} />);
  expect(screen.getByText("MyPotatoObject")).toBeInTheDocument();
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Banana")).toBeInTheDocument();
  expect(screen.getAllByText("string")).toHaveLength(2);
  expect(screen.getByText("Pear")).toBeInTheDocument();
});
