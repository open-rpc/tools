import React, { useRef, useEffect } from "react";
import { MonacoEditor, addDiagnostics } from "@open-rpc/monaco-editor-react";
import * as monaco from "monaco-editor";
import useWindowSize from "@rehooks/window-size";
import schema from "@open-rpc/meta-schema";
import { debounce } from "lodash";
import useDarkMode from "use-dark-mode";
import { initWorkers } from "./monacoWorker";
import getExtendedMetaSchema from "@open-rpc/schema-utils-js/build/get-extended-metaschema";
import applyExtensionSpec from "@open-rpc/schema-utils-js/build/apply-extension-spec";
interface IProps {
  onChange?: (newValue: string) => void;
  editorDidMount?: (model: monaco.editor.ITextModel, editor: monaco.editor.IStandaloneCodeEditor) => void;
  onMarkerChange?: (markers: monaco.editor.IMarker[]) => void;
  value: string;
}

const OpenRPCEditor: React.FC<IProps> = ({ onChange, editorDidMount, onMarkerChange, value }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const modelRef = useRef<monaco.editor.ITextModel | null>(null);
  const windowSize = useWindowSize();
  const darkMode = useDarkMode();

  // Handle window resize
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [windowSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, []);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    
    // Create model with unique URI
    const modelUriString = "inmemory://openrpc-playground.json";
    const modelUri = monaco.Uri.parse(modelUriString);
    modelRef.current = monaco.editor.createModel(value || "", "json", modelUri);
    editor.setModel(modelRef.current);
   
    const extendedMetaSchema = getExtendedMetaSchema();

    console.log("Extended meta schema:", extendedMetaSchema);
    console.log("Value:", value);
    const extendedSchema = applyExtensionSpec(JSON.parse(value), extendedMetaSchema);

    console.log("Extended schema:", extendedSchema);

    addDiagnostics(modelUriString, extendedSchema, monaco);
    // Configure JSON schema validation
    /*(monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
        uri: modelUriString,
        fileMatch: ["*"],
        schema,
      }],
      allowComments: true,
    });*/

    // Initialize Monaco workers
    initWorkers();

    // Set up marker change subscription if needed
    if (onMarkerChange) {
      editor.onDidChangeModelDecorations(
        debounce(() => {
          const markers = monaco.editor.getModelMarkers({
            resource: modelUri,
          });
          onMarkerChange(markers);
        }, 300)
      );
    }

    // Call the provided editorDidMount callback
    if (editorDidMount && modelRef.current) {
      editorDidMount(modelRef.current, editor);
    }
  };

  const handleChange = (newValue?: string) => {
    if (!newValue) return;

    // Get JSON worker and validate schema
    if (modelRef.current) {
      monaco.languages.json.getWorker().then((workerAccessor) => {
        workerAccessor(modelRef.current!.uri).then((worker: any) => {
          worker.getMatchingSchemas(modelRef.current!.uri.toString(), newValue).then((schemas: any) => {
            console.log("Matching schemas:", schemas);
          });
        });
      });
    }

    onChange?.(newValue);
  };

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      options={{
        theme: darkMode.value ? "vs-dark" : "vs",
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        automaticLayout: true,
        fixedOverflowWidgets: true,
      }}
      value={value}
      onMount={handleEditorDidMount}
      language="json"
      onChange={handleChange}
    />
  );
};

export default OpenRPCEditor;
