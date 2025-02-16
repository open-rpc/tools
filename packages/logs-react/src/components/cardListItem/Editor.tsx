// Editor.tsx
import * as React from 'react';
import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

interface EditorProps {
  value: string;
  language: string;
  height?: string | number;
  width?: string | number;
  options?: any; // monaco.editor.IStandaloneEditorConstructionOptions;
  onChange?: (value: string) => void;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  children?: React.ReactNode;
}

const Editor: React.FC<EditorProps> = ({
  value,
  language,
  height = '100%',
  width = '100%',
  options,
  onChange,
  onMount,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

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
          onChange(model.getValue());
        }
      });

      // Cleanup on unmount
      return () => {
        subscription?.dispose();
        editor.dispose();
      };
    }
  }, []); // run only once on mount

  // Update the model if the value prop changes (controlled component)
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();
      if (model && model.getValue() !== value) {
        editor.pushUndoStop();
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: value,
            },
          ],
          () => null
        );
        editor.pushUndoStop();
      }
    }
  }, [value]);

  // Update language if changed
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  return <div ref={containerRef} style={{ height, width }}>{children}</div>;
};

export default Editor;
