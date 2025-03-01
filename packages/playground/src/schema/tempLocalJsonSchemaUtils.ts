import localJsonSchema from './localJsonSchema.json';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertToLocalJsonSchema(schema: any): any {
  if (!schema) return schema;

  if (schema.definitions) {
    schema['definitions'] = { ...schema['definitions'], ...localJsonSchema['definitions'] };
    schema['definitions']['JSONSchema'] = { oneOf: localJsonSchema.oneOf };
    schema['definitions']['$ref'] = '#/definitions/JSONSchemaObject.properties.$ref';
  }

  return schema;
}
