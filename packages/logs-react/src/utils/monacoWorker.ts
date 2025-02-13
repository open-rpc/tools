/*import * as monaco from 'monaco-editor';

// Fix the type error by declaring the global interface
declare global {
  interface Window {
    MonacoEnvironment: {
      getWorkerUrl: (moduleId: string, label: string) => string;
    };
  }
}

window.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string) {
    const workerPath =
      label === 'json'
        ? 'json.worker.js'
        : label === 'css'
        ? 'css.worker.js'
        : label === 'html'
        ? 'html.worker.js'
        : label === 'typescript' || label === 'javascript'
        ? 'ts.worker.js'
        : 'editor.worker.js';

    return `/${workerPath}`;
  },
};

// Initialize the JSON language features
monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  allowComments: true,
  schemas: [],
});
*/
