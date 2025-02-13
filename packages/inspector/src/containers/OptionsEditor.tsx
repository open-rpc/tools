import React, { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import { JSONSchema, MethodObject } from "@open-rpc/meta-schema";
import useWindowSize from "@rehooks/window-size";
//import { MonacoEditor, addDiagnostics } from "@open-rpc/monaco-editor-react";
import Editor from "@monaco-editor/react";

interface IProps {
  onChange?: (newValue: any) => void;
  openrpcMethodObject?: MethodObject;
  schema?: JSONSchema;
  value: any;
}

const OptionsEditor: React.FC<IProps> = (props) => {
  const [editor, setEditor] = useState<any>();
  const windowSize = useWindowSize();
  useEffect(() => {
    if (editor) {
      editor.layout();
    }
  }, [windowSize, editor]);

  useEffect(() => {

    if (!editor) {
      return;
    } 

    editor.getModel()?.setValue(props.value);
    editor.getModel()?.setLanguage("json");
    //addDiagnostics(editor.getModel()?.uri.toString() || "", props.schema, monaco);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.schema, editor]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleEditorDidMount(ed: any) {
    setEditor(ed);
  }

  const handleChange = (newValue?: string) => {
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <>
      <div style={{ marginTop: "5px", background: "black" }}></div>
      <Editor
        height="95%"
        width="100%"
        value={props.value}
        onMount={handleEditorDidMount}
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: "off",
          glyphMargin: false,
          folding: false,
          automaticLayout: true,
          fixedOverflowWidgets: true,
        }}
        language="json"
        onChange={handleChange}
      />
    </>
  );
};

export default OptionsEditor;


