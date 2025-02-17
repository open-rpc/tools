import { it, expect, vi } from 'vitest';
import React from "react";
import Methods, { IMethodPluginProps } from "./Methods";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { render, screen, fireEvent} from "@testing-library/react";

it("renders without crashing", () => {
  render(<Methods />);
});

it("renders empty with no schema", () => {
  render(<Methods />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty schema", () => {
  render(<Methods schema={{} as any} />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty schema methods", () => {
  render(<Methods schema={{ methods: [] } as any} />);
  expect(document.body.textContent).toBe("");
});

it("renders schema methods name", () => {
  const schema = {
    methods: [
      {
        name: "get_pet",
      },
    ],
  };
  render(<Methods schema={schema as any} disableTransitionProps={true} />);
  expect(screen.getByText("get_pet")).toBeInTheDocument();
});

it("doesnt render collapsed contents", () => {
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  render(<Methods schema={schema as any} />);
  expect(screen.queryByText("foobarz")).not.toBeInTheDocument();
});

it("doesnt render collapsed contents with empty uiSchema", () => {
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  render(<Methods schema={schema as any} uiSchema={{}} />);
  expect(screen.queryByText("foobarz")).not.toBeInTheDocument();
});

it("doesnt render collapsed contents with empty uiSchema.methods", () => {
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  render(<Methods schema={schema as any} uiSchema={{ methods: {} }} />);
  expect(screen.queryByText("foobarz")).not.toBeInTheDocument();
});

it("renders collapsed contents with defaultExpanded from uiSchema", () => {
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  const uiSchema = {
    links: {},
    methods: {
      "ui:defaultExpanded": true,
    },
    params: {},
  };
  render(<Methods uiSchema={uiSchema} schema={schema as any} disableTransitionProps={true} />);
  const expandedElement = screen.getByRole('button', { expanded: true });
  expect(expandedElement).toBeInTheDocument();
});

it("renders collapsed contents with defaultExpanded with the method from uiSchema", () => {
  const schema = {
    methods: [
      {
        name: "foomethod",
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  const uiSchema = {
    links: {},
    methods: {
      "ui:defaultExpanded": {
        foomethod: true,
      },
    },
    params: {},
  };
  render(<Methods uiSchema={uiSchema} schema={schema as any} disableTransitionProps={true} />);
  const expandedElement = screen.getByRole('button', { expanded: true });
  expect(expandedElement).toBeInTheDocument();
});

it("doesnt render collapsed contents with wrong method name and defaultExpanded with method", () => {
  const schema = {
    methods: [
      {
        name: "foomethod2",
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  const uiSchema = {
    links: {},
    methods: {
      "ui:defaultExpanded": {
        foomethod: true,
      },
    },
    params: {},
  };
  render(<Methods uiSchema={uiSchema} schema={schema as any} />);
  expect(screen.queryByText("foobarz")).not.toBeInTheDocument();
});

it("renders collapsed contents with disableTransitionProps", () => {
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  render(<Methods schema={schema as any} disableTransitionProps={true} />);
  expect(screen.getByText("foobarz")).toBeInTheDocument();
});

it("renders schema plugin", () => {
  const schema = {
    methods: [
      {
        name: "get_pet",
      },
    ],
  };
  const TestComponent: React.FC<IMethodPluginProps> = () => {
    return <div>Plugin Test</div>;
  };

  render(
    <Methods schema={schema as any} methodPlugins={[TestComponent]} disableTransitionProps={true} />
  );
  expect(screen.getByText("get_pet")).toBeInTheDocument();
  expect(screen.getByText("Plugin Test")).toBeInTheDocument();
});

it("renders schema methods summary", () => {
  const schema = {
    methods: [
      {
        description: "verbose get_pet description",
        name: "get_pet",
        params: [],
        summary: "a short summary",
      },
    ],
  };
  render(<Methods schema={schema as any} disableTransitionProps={true} />);
  expect(screen.getByText("a short summary")).toBeInTheDocument();
});

it("renders schema methods description", () => {
  const schema = {
    methods: [
      {
        description: "verbose get_pet description",
      },
    ],
  } as OpenrpcDocument;
  render(<Methods schema={schema} disableTransitionProps={true} />);
  expect(screen.getByText("verbose get_pet description")).toBeInTheDocument();
});

it("renders schema methods params", () => {
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  render(<Methods schema={schema as any} disableTransitionProps={true} />);
  expect(screen.getByText("foobarz")).toBeInTheDocument();
});

it("renders schema methods result", () => {
  const schema = {
    methods: [
      {
        result: {
          schema: {
            properties: {
              id: {
                format: "int64",
                type: "integer",
              },
              name: {
                type: "string",
              },
              tag: {
                type: "string",
              },
            },
            required: ["id"],
          },
        },
      },
    ],
  };
  render(<Methods schema={schema as any} disableTransitionProps={true} />);
  expect(screen.getByText("Object")).toBeInTheDocument();
});

it("renders schema methods tags", () => {
  const schema = {
    methods: [
      {
        name: "foobar",
        result: {
          schema: {
            properties: {
              id: { format: "int64", type: "integer" },
              name: { type: "string" },
              tag: { type: "string" },
            },
            required: ["id"],
          },
        },
        tags: [
          { name: "tag3" },
          { name: "tag4" },
        ],
      },
      {
        result: {
          schema: {
            properties: {
              id: { format: "int64", type: "integer" },
              name: { type: "string" },
              tag: { type: "string" },
            },
            required: ["id"],
          },
        },
        tags: [
          { name: "salad" },
          { name: "mytag" },
        ],
      },
    ],
  };
  render(<Methods schema={schema as any} disableTransitionProps={true} />);
  expect(screen.getAllByText("Object")).toHaveLength(2);
  expect(screen.getByText("tag3")).toBeInTheDocument();
  expect(screen.getByText("tag4")).toBeInTheDocument();
  expect(screen.getByText("salad")).toBeInTheDocument();
  expect(screen.getByText("mytag")).toBeInTheDocument();
});

it("renders schema methods examples", () => {
  const schema = {
    methods: [
      {
        examples: [
          {
            name: "foo",
          },
        ],
      },
    ],
  };
  render(<Methods schema={schema as any} disableTransitionProps={true} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
});

it("renders schema methods examples with schema.examples fallback", () => {
  const schema: OpenrpcDocument = {
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
            type: "string",
          },
        }],
        result: {
          name: "test-method-result",
          schema: {
            examples: ["potato"],
            type: "string",
          },
        },
      },
    ],
    openrpc: "1.0.0",
  };
  render(<Methods schema={schema} disableTransitionProps={true} />);
  expect(screen.getByText("potato")).toBeInTheDocument();
  expect(screen.getByText("bob")).toBeInTheDocument();
});

it("can call onMethodToggle when a method is clicked", () => {
  const schema = {
    methods: [
      {
        name: "foo",
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  
  const onMethodToggle = vi.fn();
  render(
    <Methods
      schema={schema as any}
      onMethodToggle={onMethodToggle}
    />
  );
  
  const methodButton = screen.getByRole('button', { name: "foo" });
  fireEvent.click(methodButton);
  
  expect(onMethodToggle).toHaveBeenCalledWith("foo", true);
});
