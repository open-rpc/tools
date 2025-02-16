import * as React from "react";
import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { MonacoEditor, addDiagnostics } from "@open-rpc/monaco-editor-react";
import { MethodObject, OpenrpcDocument } from "@open-rpc/meta-schema";
import useWindowSize from "@rehooks/window-size";
import openrpcDocumentToJSONRPCSchema from "../helpers/openrpcDocumentToJSONRPCSchema";
import useDarkMode from "use-dark-mode";
import { initWorkers } from "./userWorker";
interface IProps {
  onChange?: (newValue: any) => void;
  openrpcMethodObject?: MethodObject;
  openrpcDocument?: OpenrpcDocument;
  value: any;
}

// Add type for JSON worker validation results
interface ValidationResult {
  message: string;
  severity: number;
  source: string;
startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

const JSONRPCRequestEditor: React.FC<IProps> = (props) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const windowSize = useWindowSize();
  //  const modelUri = model.uri.toString();
    // Configure JSON language features
   // console.log("modelUri", modelUri);
  useEffect(() => {
    console.log("useEffect Rendered");

  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [windowSize]);

  useEffect(() => {
    console.log("useEffect Rendered on props.openrpcDocument change", props.openrpcDocument);
    if (!editorRef.current) {
      return;
    }
    const model = editorRef.current.getModel();
 /*   if(!model) return;
     model.setValue(props.value);

     debugge

    // Register JSON language first
    /*monaco.languages.json.jsonDefaults.setModeConfiguration({
      documentFormattingEdits: true,
      documentRangeFormattingEdits: true,
      completionItems: true,
      hovers: true,
      documentSymbols: true,
      tokens: true,
      colors: true,
      foldingRanges: true,
      diagnostics: true
    });
    monaco.editor.setModelLanguage(model, "json");
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openrpcDocument]);

  function handleEditorDidMount(editor:any) {
    editorRef.current = editor;
    let schema: any = {
      type: "object",
      properties: {
        jsonrpc: {
          type: "string",
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
        method: {
          type: "string",
        },
      },
    };

    if (props.openrpcDocument) {
      schema = openrpcDocumentToJSONRPCSchema(props.openrpcDocument);
    } else {
      schema = {
        additionalProperties: false,
        properties: {
          ...schema.properties,
          params: {
            oneOf: [
              { type: "array" },
              { type: "object" },
            ],
          },
        },
      };
    }

    // Configure JSON language features

    const model = monaco.editor.createModel(props.value, "json")
    model.onDidChangeAttached(()=>{
      console.log("model attached", model.uri.toString());
    //monaco.editor.setModelLanguage(model, "json");
    debugger
    addDiagnostics(model.uri.toString() || "", schema, monaco);
    console.log("diagnostiics added")
    })
    editorRef.current?.setModel(model)
    console.log("model that we mount with", model.uri.toString());

    monaco.editor.onDidChangeMarkers((event) => {
      console.log("Updated markers:", event);
      const markers = monaco.editor.getModelMarkers({ resource: event[0] });
      console.log("Model Markers:", markers);
      })
    editorRef.current?.focus();
        // Enable JSON language features
    
    initWorkers();
    // Retrieve JSON worker and get matching schemas for our model

    const markers = monaco.editor.getModelMarkers({ resource: model.uri });
    console.log("Model Markers:", markers, schema);

  }

  const handleChange = (newValue?: string) => {
    console.log("handleChange value:", newValue);
    const model = editorRef.current?.getModel();
    if(!model) return;
    monaco.languages.json.getWorker().then((workerAccessor: any) => {
      workerAccessor(model.uri).then((worker: any) => {
        debugger
        worker.getMatchingSchemas(model.uri.toString(), model.getValue()).then((schemas: any) => {
          console.log("getMatchingSchemas returned:", schemas);
        });
      });
    });
    if (props.onChange) {
      props.onChange(newValue);
    }

  };

  const darkMode = useDarkMode();
  return (
    <MonacoEditor
      height="100%"
      width="100%"
      value={props.value}
      onMount={handleEditorDidMount}
      options={{
        theme: darkMode.value ? "vs-dark" : "vs",
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        fixedOverflowWidgets: true,
      }}
      language="json"
      onChange={handleChange}
    />
  );
};

export default JSONRPCRequestEditor;
