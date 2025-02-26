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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (newValue: any) => void;
  openrpcMethodObject?: MethodObject;
  openrpcDocument?: OpenrpcDocument;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}


const JSONRPCRequestEditor: React.FC<IProps> = (props) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const windowSize = useWindowSize();

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

    const schema = getUpdatedSchema(props.openrpcDocument);
    addDiagnostics(model?.uri.toString() || "", schema, monaco);
  }, [props.openrpcDocument]);



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getUpdatedSchema( openrpcDocument?: OpenrpcDocument): any {
    if(!editorRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (openrpcDocument) {
      schema = openrpcDocumentToJSONRPCSchema(openrpcDocument);
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
    return schema;
  }

    // Configure JSON language features
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleEditorDidMount(editor:any) {
    editorRef.current = editor;
    // Configure JSON language features
    const schema = getUpdatedSchema(props.openrpcDocument);
    const model = monaco.editor.createModel(props.value, "json")
    model.onDidChangeAttached(()=>{
    addDiagnostics(model.uri.toString() || "", schema, monaco);
    })
    editorRef.current?.setModel(model)

    editorRef.current?.focus();
    initWorkers();
  }

  const handleChange = (newValue?: string) => {
    const model = editorRef.current?.getModel();
    if(!model) return;
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
