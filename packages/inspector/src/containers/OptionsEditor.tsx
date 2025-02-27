import * as React from 'react';
import { useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { JSONSchema, MethodObject } from '@open-rpc/meta-schema';
import useWindowSize from '@rehooks/window-size';
import { MonacoEditor, addDiagnostics } from '@open-rpc/monaco-editor-react';
import useDarkMode from 'use-dark-mode';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (newValue: any) => void;
  openrpcMethodObject?: MethodObject;
  schema?: JSONSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

const OptionsEditor: React.FC<IProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    editor.getModel()?.setLanguage('json');
    addDiagnostics(editor.getModel()?.uri.toString() || '', props.schema, monaco);
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
  const darkMode = useDarkMode();

  return (
    <>
      <div style={{ marginTop: '5px', background: 'black' }}></div>
      <MonacoEditor
        height="95%"
        width="100%"
        value={props.value}
        onMount={handleEditorDidMount}
        options={{
          theme: darkMode.value ? 'vs-dark' : 'vs',
          minimap: {
            enabled: false,
          },
          lineNumbers: 'off',
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
