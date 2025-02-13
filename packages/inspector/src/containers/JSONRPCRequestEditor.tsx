import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { MonacoEditor, addDiagnostics } from "@open-rpc/monaco-editor-react";
import { MethodObject, OpenrpcDocument } from "@open-rpc/meta-schema";
import useWindowSize from "@rehooks/window-size";
import openrpcDocumentToJSONRPCSchema from "../helpers/openrpcDocumentToJSONRPCSchema";
//import Editor from "@monaco-editor/react";

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
    if (!editorRef.current) {
      return;
    }
    const model = editorRef.current.getModel();
    if(!model) return;
     model.setValue(props.value);

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
    });*/
    monaco.editor.setModelLanguage(model, "json");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openrpcDocument, editorRef.current]);

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
    editorRef.current?.setModel(model)

    editor.focus();
        // Enable JSON language features
    addDiagnostics(model.uri.toString() || "", schema, monaco);

  }

  const handleChange = (newValue?: string) => {
    if (props.onChange) {
      props.onChange(newValue);
    }
    /*if(!editorRef.current) 
      {
        console.log("editor is not set");
        return;
      }
      else 
      {
        console.log("editor is set");
    const model = editorRef.current.getModel();
    const markers = monaco.editor.getModelMarkers({ resource: editorRef.current.getModel().uri });
    console.log("Markers:", markers);

    const registeredSchemas = monaco.languages.json.jsonDefaults.diagnosticsOptions.schemas;
    console.log("Registered schemas:", registeredSchemas);
      }*/
    

    
  };


  return (
    <MonacoEditor
      height="100%"
      width="100%"
      value={props.value}
      onMount={handleEditorDidMount}
    
      options={{
        
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
