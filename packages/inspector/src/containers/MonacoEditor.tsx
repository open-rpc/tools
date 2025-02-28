// Editor.tsx
import * as React from 'react';
import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
//import './userWorker';

interface MonacoEditorProps {
  value: string;
  language: string;
  height?: string | number;
  width?: string | number;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  onChange?: (value: string) => void;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  children?: React.ReactNode;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language,
  height = '100%',
  width = '100%',
  options,
  onChange,
  onMount,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const isMounted = useRef(true);
  const valueRef = useRef(value);

  // Initialize the editor once on mount
  useEffect(() => {
    if (containerRef.current) {
      const editor = monaco.editor.create(containerRef.current, {
        value,
        language,
        automaticLayout: true,
        ...options,
      });
      editorRef.current = editor;
      if (onMount) onMount(editor);

      // Listen to changes and call onChange if provided
      const model = editor.getModel();
      const subscription = model?.onDidChangeContent(() => {
        if (onChange && model) {
          const newValue = model.getValue();
          valueRef.current = newValue;
          onChange(newValue);
        }
      });

      // Cleanup on unmount
      return () => {
        subscription?.dispose();
        isMounted.current = false;
      };
    }
  }, []); // run only once on mount

  // Dispose the editor when the component unmounts
  useEffect(() => {
    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  // Update the model if the value prop changes (controlled component)
  useEffect(() => {
    if (!isMounted.current) return;
    const editor = editorRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!editor || (editor as any)._isDisposed) return;

    const model = editor.getModel();
    if (!model || model.isDisposed()) return;

    // Only update if the value is different from our last known value
    if (value !== valueRef.current) {
      const position = editor.getPosition();
      model.setValue(value);
      valueRef.current = value;
      if (position) {
        editor.setPosition(position);
      }
    }
  }, [value]);

  // Update language if changed
  useEffect(() => {
    if (!isMounted.current) return;
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  return <div ref={containerRef} style={{ height, width }} />;
};

export default MonacoEditor;
