import React from 'react';
import { createRoot } from 'react-dom/client';
//import Editor from "@monaco-editor/react";
//import { Editor } from "./Editor";
import { MonacoEditor } from "@open-rpc/monaco-editor-react";
import * as monaco from 'monaco-editor';
const App = () => {


  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden' 
    }}>
      {/*<Editor defaultValue={JSON.stringify({ hello: 'world' }, null, 2)} />*/}
      <MonacoEditor
        height="90vh"
        width="100vw"
        value={JSON.stringify({ hello: 'world' }, null, 2)}
        language="json" 
        onChange={(value) => console.log('Code changed:', value)}
        onMount={(editor: monaco.editor.IStandaloneCodeEditor) => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "food",
          fileMatch: ["*"],
          schema: {
            type: "object",
            properties: {
              p1: {
                enum: ["v1", "v2"],
              },
              p2: {
                $ref: "http://myserver/bar-schema.json",
              },
            },
          },
        },
        {
          uri: "http://myserver/bar-schema.json",
          schema: {
            type: "object",
            properties: {
              q1: {
                enum: ["x1", "x2"],
              },
            },
          },
        },
      ],
    });

            editor.setModel(monaco.editor.createModel(JSON.stringify({ hello: 'world' }, null, 2), "json")) 
            editor.focus()

         

        }}
      >
        <div>
          <h1>Hello</h1>
        </div>
      </MonacoEditor>
      {/*<MonacoEditor
        width="100%"
        height="100%"
        value={"{}"}
        language="json"
        onChange={(value) => console.log('Code changed:', value)}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          automaticLayout: true,
          scrollBeyondLastLine: false
        }}
        onMount={(editor: any) => {
          //editor.getModel().setValue(defaultCode);
        }}
      />*/}

    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 