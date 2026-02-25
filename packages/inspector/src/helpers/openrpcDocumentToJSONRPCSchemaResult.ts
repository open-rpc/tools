import { MethodObject, ContentDescriptorObject, OpenrpcDocument } from '@open-rpc/tool-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schema: any = {
  type: 'object',
  properties: {
    jsonrpc: {
      type: 'string',
      description: 'JSON-RPC Version String',
      const: '2.0',
    },
    id: {
      oneOf: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
    },
  },
};

const openrpcDocumentToJSONRPCSchemaResult = (
  openrpcDocument: OpenrpcDocument,
  methodName: string
) => {
  const methodObject = openrpcDocument.methods.find(
    (method) => (method as MethodObject).name === methodName
  ) as MethodObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let methodSchema: any;
  if (methodObject !== undefined && methodObject.result !== undefined) {
    methodSchema = (methodObject.result as ContentDescriptorObject).schema;
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
      result: {
        ...methodSchema,
        markdownDescription: methodObject?.description || methodObject?.summary,
        description: methodObject?.description || methodObject?.summary,
      },
    },
  };
};

export default openrpcDocumentToJSONRPCSchemaResult;
