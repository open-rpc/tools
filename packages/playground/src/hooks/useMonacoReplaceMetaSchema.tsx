import { useState, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { getExtendedMetaSchema } from '@open-rpc/tool-types';

const defaultSchema = getExtendedMetaSchema('1.4');

// Monaco Replace Meta Schema:
// Press Chord Ctrl-K, Ctrl-R => the action will run if it is enabled
const useMonacoReplaceMetaSchema = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const [metaSchema, setMetaSchema] = useState(defaultSchema);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.addAction({
      id: 'replace-meta-schema',
      label: 'Replace Meta Schema',
      keybindings: [
        monaco.KeyMod.chord(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR
        ), //tslint:disable-line
      ],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: () => {
        const result = window.prompt('Paste schema to replace current meta schema', '{}');
        if (result) {
          setMetaSchema(JSON.parse(result));
        }
      },
    });
  }, [editor]);

  return [metaSchema];
};

export default useMonacoReplaceMetaSchema;
