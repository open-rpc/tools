import localJsonSchema from './localJsonSchema.json';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertToLocalJsonSchema(schema: any): any {
  if (!schema) return schema;
  const schemaCopy = JSON.parse(JSON.stringify(schema));

  if (!schemaCopy.definitions) {
    schemaCopy.definitions = {};
  }

  // Clone localJsonSchema definitions but resolve self-references
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedDefinitions: Record<string, any> = {};

  Object.entries(schemaCopy.definitions).forEach(([key, def]) => {
    resolvedDefinitions[key] = JSON.parse(JSON.stringify(def));
  });

  // Process each definition from localJsonSchema
  Object.entries(localJsonSchema.definitions).forEach(([key, def]) => {
    // Deep clone the definition
    resolvedDefinitions[key] = JSON.parse(JSON.stringify(def));
  });

  // Function to recursively replace "#" refs with inline schema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function resolveRefs(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => resolveRefs(item));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$ref' && (value === '#' || value === 'https://meta.json-schema.tools')) {
        // Replace root reference with explicit oneOf
        return {
          oneOf: [
            { $ref: '#/definitions/JSONSchemaObject' },
            { $ref: '#/definitions/JSONSchemaBoolean' },
          ],
        };
      } else if (typeof value === 'object') {
        result[key] = resolveRefs(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  // Resolve refs in all definitions
  for (const key in resolvedDefinitions) {
    resolvedDefinitions[key] = resolveRefs(resolvedDefinitions[key]);
  }

  // Merge the resolved definitions
  schemaCopy.definitions = {
    ...schemaCopy.definitions,
    ...resolvedDefinitions,
  };
  // Reference object special case
  schemaCopy['definitions']['referenceObject']['properties']['$ref'] = {
    $ref: '#/definitions/JSONSchemaObject/properties/$ref',
  };

  return schemaCopy;
}
