import { createRoot } from 'react-dom/client';
import React from 'react';
import MyApp from './containers/MyApp';
import JSONSchemaTree from './containers/JSONSchemaTree';
export { JSONSchemaTree };
export default JSONSchemaTree;

if ('development' === process.env.NODE_ENV) {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Failed to find root element');
  }

  const root = createRoot(rootElement);
  root.render(<MyApp greeting="foo" />);
}
