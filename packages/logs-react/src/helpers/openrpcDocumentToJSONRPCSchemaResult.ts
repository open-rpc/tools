import { MethodObject, ContentDescriptorObject, OpenrpcDocument, MethodOrReference } from "@open-rpc/meta-schema";

const isMethodObject = (method: MethodOrReference): method is MethodObject => {
  return "name" in method && "params" in method;
};

const schema: any = {
  type: "object",
  properties: {
    jsonrpc: {
      type: "string",
      description: "JSON-RPC Version String",
      const: "2.0",
    },
    id: {
      oneOf: [
        {
          type: "string",
        },
        {
          type: "number",
        },
      ],
    },
  },
};

const openrpcDocumentToJSONRPCSchemaResult = (methodName: string, openrpcDocument?: OpenrpcDocument) => {
  if (!openrpcDocument) {
    return schema;
  }
  const methodObject = openrpcDocument.methods
    .filter(isMethodObject)
    .find((method) => method.name === methodName);
  let methodSchema: any;
  if (methodObject !== undefined && methodObject.result !== undefined) {
    methodSchema = (methodObject.result as ContentDescriptorObject).schema;
  }
  return {
    type: "object",
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
