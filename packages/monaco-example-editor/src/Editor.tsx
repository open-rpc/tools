import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface EditorProps {
  defaultValue?: string;
}

export const Editor: React.FC<EditorProps> = ({ defaultValue = '' }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  


  useEffect(() => {
    if (!containerRef.current) return;
    // Configure JSON schemas
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

    const modelUri = monaco.Uri.parse("a://b/foo.json");
    const model = monaco.editor.createModel(defaultValue, "json", modelUri);

    editorRef.current = monaco.editor.create(containerRef.current, {
      model,
      automaticLayout: true,
    });

    return () => {
      model.dispose();
      editorRef.current?.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
};