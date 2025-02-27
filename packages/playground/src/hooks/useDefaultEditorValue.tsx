import { useState, Dispatch } from 'react';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDefaultEditorValue(): [string | null, Dispatch<any>] {
  const [defaultValue, setDefaultValue] = useState<string | null>(() => {
    return window.localStorage.getItem('schema');
  });
  const setDefaultEditorValue = (str: string) => {
    _.defer(() => window.localStorage.setItem('schema', str));
    setDefaultValue(str);
  };
  return [defaultValue, setDefaultEditorValue];
}

export default useDefaultEditorValue;
