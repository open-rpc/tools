const GLOBAL_SCHEMA_DIAGNOSTICS_SYMBOL = Symbol.for('OPEN_RPC_GLOBAL_SCHEMA_DIAGNOSTICS');
interface IDiagnosticSchemaMapSingleton {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

const diagnosticSchemaMap: IDiagnosticSchemaMapSingleton =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any)[GLOBAL_SCHEMA_DIAGNOSTICS_SYMBOL] || {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any)[GLOBAL_SCHEMA_DIAGNOSTICS_SYMBOL] = diagnosticSchemaMap;
export function addDiagnostics(
  uri: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  monaco: any,
  fileMatch?: Array<string>
): void {
  diagnosticSchemaMap[uri] = schema;
  const diagnosticOptions = {
    enableSchemaRequest: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schemas: Object.entries(diagnosticSchemaMap).map(([u, s]: [string, any]) => {
      return {
        fileMatch: fileMatch ? fileMatch : [u],
        schema: s,
        uri: u,
      };
    }),
    validate: true,
  };
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions(diagnosticOptions);
}
