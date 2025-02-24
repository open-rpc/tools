import {
  MethodObject,
  ContentDescriptorObject,
  OpenrpcDocument,
  ExampleObject,
  MethodOrReference,
} from '@open-rpc/meta-schema';

const isMethodObject = (method: MethodOrReference): method is MethodObject => {
  return 'name' in method && 'params' in method;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schema: any = {
  type: 'object',
  properties: {
    jsonrpc: {
      type: 'string',
      enum: ['2.0'],
      description: 'JSON-RPC version string',
    },
    id: {
      description: 'unique identifier for the JSON-RPC request',
      oneOf: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
    },
    method: {
      type: 'string',
    },
  },
};

const openrpcDocumentToJSONRPCSchema = (openrpcDocument?: OpenrpcDocument) => {
  if (!openrpcDocument) {
    return schema;
  }
  return {
    type: 'object',
    properties: {
      id: {
        ...schema.properties.id,
      },
      jsonrpc: {
        ...schema.properties.jsonrpc,
      },
      method: {
        type: 'string',
        oneOf: openrpcDocument?.methods?.filter(isMethodObject).map((method) => ({
          const: method.name,
          description: method.description || method.summary,
          markdownDescription: method.description || method.summary,
        })),
      },
    },
    allOf: openrpcDocument?.methods?.filter(isMethodObject).map((method) => ({
      if: {
        properties: {
          method: {
            const: method.name,
          },
        },
      },
      then: {
        properties: {
          params: {
            oneOf: [
              {
                type: 'array',
                minItems:
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  method.params && method.params.filter((param: any) => param.required).length,
                maxItems: method.params && method.params.length,
                defaultSnippets: method.examples
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    method.examples.map((example: any) => {
                      return {
                        label: example.name,
                        description: example.description || example.summary,
                        body: example.params && example.params.map((ex: ExampleObject) => ex.value),
                      };
                    })
                  : [],
                items:
                  method.params &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  method.params.map((param: any) => {
                    return {
                      ...param.schema,
                      markdownDescription: param.description || param.summary,
                      description: param.description || param.summary,
                      additionalProperties: false,
                    };
                  }),
              },
              {
                type: 'object',
                properties:
                  method.params &&
                  (method.params as ContentDescriptorObject[]).reduce(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (memo: any, param: ContentDescriptorObject) => {
                      memo[param.name] = {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ...(param.schema as any),
                        markdownDescription: param.description || param.summary,
                        description: param.description || param.summary,
                        additionalProperties: false,
                      };
                      return memo;
                    },
                    {}
                  ),
              },
            ],
          },
        },
      },
    })),
  };
};

export default openrpcDocumentToJSONRPCSchema;
