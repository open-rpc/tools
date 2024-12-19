import { createStore } from 'reusable';
import useSearchBar from '../hooks/useSearchBar';
import queryParamStore from './queryParamsStore';

export default createStore(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [query] = queryParamStore() as any;

  return useSearchBar(query.schemaUrl || query.url || process.env.REACT_APP_DEFAULT_SCHEMAURL);
});
