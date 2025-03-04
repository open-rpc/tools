# x-error-groups Extension

## Introduction

The `x-error-groups` extension enhances OpenRPC documents by providing a structured way to organize, group, and reuse JSON-RPC error definitions. This extension allows API developers to define collections of related errors that can be referenced throughout an OpenRPC document.

## Purpose

Standard JSON-RPC error handling typically involves defining individual errors. However, real-world APIs often have classes of related errors that should be grouped together. This extension solves several problems:

- **Organization**: Group related errors (like authentication errors, validation errors, etc.)
- **Reusability**: Define error groups once and reference them in multiple methods
- **Consistency**: Maintain consistent error definitions across your API
- **Readability**: Make API documentation more structured and easier to understand

## Specification

The `x-error-group` extension is an array that can contain:

1. Direct arrays of error objects, each with:

   - `code`: Integer error code (required)
   - `message`: Error message string (required)
   - `data`: Additional error data (optional)

2. Reference objects pointing to predefined error groups:
   - `$ref`: String reference to a component error group

The extension is restricted to the `methodObject` context.

## Usage

### Defining Error Groups

Error groups are typically defined in the `components` section of an OpenRPC document:

```json
"components": {
  "x-error-group": {
    "AuthErrors": [
      {
        "code": -32000,
        "message": "Unauthorized",
        "data": "Authentication required for this operation."
      },
      {
        "code": -32001,
        "message": "Forbidden",
        "data": "Insufficient permissions for this operation."
      }
    ]
  }
}
```

### Using Error Groups in Methods

Methods can reference these error groups and combine them with additional errors:

```json
"methods": [
  {
    "name": "getUserData",
    "x-error-group": [
      {
        "$ref": "#/components/x-error-group/AuthErrors"
      },
      [
        {
          "code": 50000,
          "message": "User Not Found",
          "data": "The requested user was not found."
        }
      ]
    ]
  }
]
```

## Examples

### Complete Example

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
        },
        {
          "code": -32800,
          "message": "Parse error",
          "data": "An unexpected parse error occurred"
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

## Benefits

- **Modular Error Definitions**: Define error groups once and reuse them
- **Union Behavior**: Combine multiple error groups for comprehensive error handling
- **Improved Documentation**: Clearly communicate possible errors to API consumers
- **Maintainability**: Update error definitions in one place

## Additional Resources

- [OpenRPC Specification](https://spec.open-rpc.org/)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)
- [GitHub Repository](https://github.com/open-rpc/specification-extension-spec)
