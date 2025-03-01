import React, { useRef, useEffect } from 'react';
import { MonacoEditor, addDiagnostics } from '@open-rpc/monaco-editor-react';
import * as monaco from 'monaco-editor';
import useWindowSize from '@rehooks/window-size';
import { debounce } from 'lodash';
import useDarkMode from 'use-dark-mode';
import { initWorkers } from './monacoWorker';
import { getDocumentExtendedMetaSchema } from '@open-rpc/schema-utils-js';
import { convertToLocalJsonSchema } from './schema/tempLocalJsonSchemaUtils';

interface IProps {
  onChange?: (newValue: string) => void;
  editorDidMount?: (
    model: monaco.editor.ITextModel,
    editor: monaco.editor.IStandaloneCodeEditor
  ) => void;
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
    const modelUriString = 'inmemory://openrpc-playground.json';
    const modelUri = monaco.Uri.parse(modelUriString);
    modelRef.current = monaco.editor.createModel(value || '', 'json', modelUri);
    editor.setModel(modelRef.current);

    try {
      const extendedMetaSchema = getDocumentExtendedMetaSchema(JSON.parse(value));
      const convertedSchema = convertToLocalJsonSchema(extendedMetaSchema);
      addDiagnostics(modelUriString, convertedSchema, monaco);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      //console.warn('Invalid OpenRPC Document, skipping schema update');
    }
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

    if (modelRef.current) {
      try {
        const extendedMetaSchema = getDocumentExtendedMetaSchema(JSON.parse(newValue));
        addDiagnostics(modelRef.current.uri.toString(), extendedMetaSchema, monaco);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        //console.warn('Invalid OpenRPC Document, skipping schema update');
      }
    }

    onChange?.(newValue);
  };

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      options={{
        theme: darkMode.value ? 'vs-dark' : 'vs',
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
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
