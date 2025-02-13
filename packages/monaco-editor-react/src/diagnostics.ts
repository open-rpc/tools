interface IDiagnosticSchemaMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

const diagnosticSchemaMap: IDiagnosticSchemaMap = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addDiagnostics(uri: string, schema: any, monaco: any): void {
  diagnosticSchemaMap[uri] = schema;
  const diagnosticOptions = {
    enableSchemaRequest: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schemas: Object.entries(diagnosticSchemaMap).map(([u, s]: [string, any]) => {
      return {
        fileMatch: [u],
        schema: s,
        uri: u,
      };
    }),
    validate: true,
  };
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions(diagnosticOptions);
}
