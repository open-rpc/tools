# OpenRPC Extensions

A collection of OpenRPC Specification Extensions that enhance and extend the functionality of OpenRPC documents.

## Overview

This repository contains concrete implementations of OpenRPC extensions that follow the [OpenRPC Specification Extension](https://github.com/open-rpc/specification-extension-spec) format. Extensions in this repository may eventually be adopted into the official OpenRPC specification after proving their usefulness and gaining community adoption.

Extensions are always prefixed with `x-` and allow developers to add features and functionality that aren't currently in the OpenRPC specification or fall outside of the specification context.

## Purpose

The extensions repository serves several important purposes:

- **Centralized Collection**: Provides a common place for useful OpenRPC extensions
- **Reusability**: Makes it easy for developers to adopt existing extensions in their projects
- **Standardization**: Encourages consistent extension patterns across the ecosystem
- **Incubation**: Allows extensions to be tested and refined before potential inclusion in the official specification
- **Tooling Support**: Enables OpenRPC tools to support these extensions consistently

## Repository Structure

Extensions are organized in the following structure:

```
packages/extensions/
├── src/
│   ├── x-extension-name/
│   │   ├── README.md           # Documentation for the extension
│   │   ├── index.ts            # TypeScript exports and types
│   │   └── x-extension-name.json  # Extension definition
│   ├── x-another-extension/
│   │   └── ...
│   └── index.ts                # Exports all extensions
└── ...
```

Each extension must include:

1. A README.md with documentation
2. An index.ts file with TypeScript types and exports
3. An x-extension-name.json file with the extension definition

The root index.ts file should export the JSON and types for all extensions to make them available to other projects.

## Available Extensions

### x-error-groups

Group, organize, and reuse JSON-RPC error definitions across OpenRPC methods via references. This extension allows defining reusable error collections that can be referenced across methods.

[View Documentation](./src/x-error-groups/README.md)

## Using Extensions

To use an extension in your OpenRPC document, you must:

1. Include the extension definition in the `x-extensions` array at the root of your OpenRPC document
2. Use the extension in the appropriate location as specified by the extension's `restricted` field

Here's a complete example:

```json
{
  "openrpc": "1.2.6",
  "info": {
    "title": "Example API",
    "version": "1.0.0"
  },
  "methods": [
    {
      "name": "exampleMethod",
      "x-error-group": [
        {
          "$ref": "#/components/x-error-group/CommonErrors"
        }
      ]
    }
  ],
  "components": {
    "x-error-group": {
      "CommonErrors": [
        {
          "code": -32000,
          "message": "Server error",
          "data": "An unexpected error occurred"
        }
      ]
    }
  },
  "x-extensions": [
    {
      "openrpcExtension": "0.0.0-development",
      "name": "x-error-group",
      "version": "0.0.1",
      "description": "Enables grouping and organization of JSON-RPC errors in OpenRPC methods.",
      "summary": "Group, organize, and reuse JSON-RPC error definitions across OpenRPC methods via references",
      "externalDocumentation": {
        "description": "github",
        "url": "https://github.com/open-rpc/tools/tree/main/packages/extensions/src/x-error-groups"
      },
      "restricted": ["methodObject"],
      "schema": {
        "type": "array",
        "items": {
          "oneOf": [
            {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "code": {
                    "type": "integer",
                    "description": "The code of the error."
                  },
                  "message": {
                    "type": "string",
                    "description": "The message of the error."
                  },
                  "data": {
                    "description": "The data of the error."
                  }
                },
                "required": ["code", "message"]
              }
            },
            {
              "type": "object",
              "properties": {
                "$ref": {
                  "type": "string"
                }
              },
              "required": ["$ref"]
            }
          ]
        }
      }
    }
  ]
}
```

The `x-extensions` array contains the full definition of each extension used in your document, which allows tools to understand and validate your use of the extension.

## Contributing New Extensions

To propose a new extension:

1. Create a new folder in `src/` with your extension name (prefixed with `x-`)
2. Add the required files (README.md, index.ts, and x-extension-name.json)
3. Update the root index.ts to export your extension
4. Submit a Pull Request to this repository

New extensions should solve a common problem or provide functionality that would be useful across multiple OpenRPC documents.

## Extension Lifecycle

Extensions in this repository follow a lifecycle:

1. **Proposal**: Initial submission as a PR to this repository
2. **Incubation**: Extension is used and refined in real-world applications
3. **Adoption**: Extension gains support in OpenRPC tooling
4. **Standardization**: If widely adopted, the extension may be proposed for inclusion in the official OpenRPC specification via the [open-rpc/spec](https://github.com/open-rpc/spec) repository

## Related Resources

- [OpenRPC Specification](https://spec.open-rpc.org/)
- [OpenRPC Specification Extension Spec](https://github.com/open-rpc/specification-extension-spec)
- [OpenRPC Tools](https://github.com/open-rpc/tools)

## License

[Apache 2.0](LICENSE)
