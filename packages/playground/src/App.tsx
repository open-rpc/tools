import React, { useState, useEffect, Dispatch } from 'react';
import JSONValidationErrorList from './JSONValidationErrorList';
import * as monaco from 'monaco-editor';
import { Documentation } from '@open-rpc/docs-react';
import './App.css';
import AppBar from './AppBar/AppBar';
import { IUISchema } from './UISchema';
import { SnackBar, ISnackBarNotification, NotificationType } from './SnackBar/SnackBar';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes/openrpcTheme';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { CssBaseline, Container, Tab, Typography, IconButton, Tooltip, Tabs } from '@mui/material';
import useParsedSchema from './hooks/useParsedSchema';
import useDefaultEditorValue from './hooks/useDefaultEditorValue';
import InspectorPlugin from './plugins/InspectorPlugin';
import UISchemaStore from './stores/UISchemaStore';
import searchBarStore from './stores/searchBarStore';
import examples from './examplesList';
import OpenRPCEditor from './OpenRPCEditor';
import useMonacoReplaceMetaSchema from './hooks/useMonacoReplaceMetaSchema';
import { IExample } from './ExampleDocumentsDropdown/ExampleDocumentsDropdown';
import Inspector from '@open-rpc/inspector';
import useInspectorActionStore from './stores/inspectorActionStore';
import { useTransport, defaultTransports, ITransport } from './hooks/useTransport';
import fetchUrlSchemaFile from './fetchUrlSchemaFile';
import queryParamsStore from './stores/queryParamsStore';
import { useDebounce } from 'use-debounce';
import { initWorkers } from './monacoWorker';
import NewPlaygroundSplitPane from './PlaygroundSplitPane';
import { lightTheme as reactJsonLightTheme } from '@uiw/react-json-view/light';
import { vscodeTheme as reactJsonDarkTheme } from '@uiw/react-json-view/vscode';

const App: React.FC = () => {
  const [defaultValue, setDefaultValue] = useDefaultEditorValue();
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([] as monaco.editor.IMarker[]);
  const [searchUrl, setSearchUrl] = searchBarStore();
  const [searchUrlDebounced] = useDebounce(searchUrl, 1000);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>();
  const [error, setError] = useState<string | undefined>();
  const [notification, setNotification] = useState<ISnackBarNotification | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [UISchema, setUISchemaBySection]: [IUISchema, any] = UISchemaStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editor, setEditor]: [any, Dispatch<Record<string, never>>] = useState();
  const [horizontalSplit, privateSetHorizontalSplit] = useState(false);
  const [parsedSchema, setParsedSchema] = useParsedSchema(
    defaultValue ? JSON.parse(defaultValue) : null
  );
  const [query] = queryParamsStore();
  const setHorizontalSplit = (val: boolean) => {
    if (editor) {
      setTimeout(() => {
        editor.layout();
      }, 0);
    }
    privateSetHorizontalSplit(val);
  };
  const [inspectorContents] = useInspectorActionStore();
  useMonacoReplaceMetaSchema(editor);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (__: any, ed: any) => {
    setEditor(ed);
  };

  useEffect(() => {
    monaco.editor.setTheme(UISchema.appBar['ui:darkMode'] ? 'vs-dark' : 'vs');
    initWorkers();
  }, []);

  useEffect(() => {
    const defaultExample = examples.find((e) => e.name === 'petstore');
    if (!defaultValue && !searchUrl && defaultExample) {
      setSearchUrl(defaultExample.url);
    }
  }, [defaultValue]);

  useEffect(() => {
    setReactJsonOptions({
      ...reactJsonOptions,
      style: UISchema.appBar['ui:darkMode'] ? reactJsonDarkTheme : reactJsonLightTheme,
    });
  }, [UISchema.appBar['ui:darkMode']]);

  useEffect(() => {
    if (results && editor) {
      editor.setValue(results);
    }
    if (results) {
      setParsedSchema(results!);
    }
  }, [results]);

  useEffect(() => {
    if (error) {
      setNotification({
        type: NotificationType.error,
        message: error,
      });
    }
  }, [error]);

  useEffect(() => {
    setParsedSchema(defaultValue || '');
  }, [defaultValue]);
  const [reactJsonOptions, setReactJsonOptions] = useState({
    style: reactJsonDarkTheme,
    shortenTextAfterLength: 25,
    displayDataTypes: false,
    displayObjectSize: false,
    indentWidth: 2,
  });
  const [transportList, setTransportList] = useState(defaultTransports);
  const getQueryTransport = () => {
    if (!query.transport) {
      return transportList[0];
    }
    const queryTransport = transportList.find((item) => item.type === query.transport);
    return queryTransport || transportList[0];
  };
  const currentTheme = UISchema.appBar['ui:darkMode'] ? darkTheme : lightTheme;
  const [transport, selectedTransportType, setTransportType] = useTransport(
    transportList,
    searchUrlDebounced || '',
    getQueryTransport()
  );

  useEffect(() => {
    if (UISchema.appBar['ui:darkMode']) {
      monaco.editor.setTheme('vs-dark');
    } else {
      monaco.editor.setTheme('vs');
    }
  }, [UISchema.appBar['ui:darkMode']]);

  const refreshOpenRpcDocument = async () => {
    // handle .json urls
    if (searchUrlDebounced && searchUrlDebounced.includes('.json')) {
      const rd = await fetchUrlSchemaFile(searchUrlDebounced);
      setDefaultValue(rd);
      return setResults(rd);
    }
    try {
      const d = await transport?.sendData({
        internalID: 999999,
        request: {
          jsonrpc: '2.0',
          params: [],
          id: 999999,
          method: 'rpc.discover',
        },
      });
      const rd = JSON.stringify(d, null, 2);
      if (rd) {
        setDefaultValue(rd);
        setResults(rd);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (searchUrlDebounced && transport) {
      refreshOpenRpcDocument();
    }
  }, [searchUrlDebounced, transport]);

  useEffect(() => {
    if (inspectorContents) {
      setHorizontalSplit(true);
    }
  }, [inspectorContents]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline enableColorScheme />
      <AppBar
        searchBarUrl={searchUrl}
        uiSchema={UISchema}
        examples={examples as IExample[]}
        onExampleDocumentsDropdownChange={(example: IExample) => setSearchUrl(example.url)}
        selectedTransport={selectedTransportType}
        transportList={transportList}
        onTransportChange={(changedTransport) => setTransportType(changedTransport)}
        onTransportAdd={(addedTransport: ITransport) => {
          setTransportList((oldList) => {
            return [...oldList, addedTransport];
          });
        }}
        onSplitViewChange={(value) => {
          setUISchemaBySection({
            value,
            key: 'ui:splitView',
            section: 'appBar',
          });
        }}
        onDarkModeChange={(value: boolean) => {
          monaco.editor.setTheme(value ? 'vs-dark' : 'vs');
          setUISchemaBySection({
            value: value,
            key: 'ui:darkMode',
            section: 'appBar',
          });
        }}
        onChangeUrl={setSearchUrl}
      />
      <NewPlaygroundSplitPane
        showInspector={horizontalSplit}
        editorAndDocumentationSplit={UISchema.appBar['ui:splitView']}
        editorComponent={
          <>
            <JSONValidationErrorList markers={markers} />
            <OpenRPCEditor
              editorDidMount={handleEditorDidMount}
              onMarkerChange={(mks) => {
                setMarkers(mks);
              }}
              onChange={(val) => {
                setParsedSchema(val);
              }}
              value={defaultValue || ''}
            />
          </>
        }
        documentationComponent={
          <>
            <Container>
              <Documentation
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                schema={parsedSchema as any}
                uiSchema={UISchema}
                reactJsonOptions={{
                  ...reactJsonOptions,
                  style: UISchema.appBar['ui:darkMode'] ? reactJsonDarkTheme : reactJsonLightTheme,
                }}
                methodPlugins={
                  UISchema.methods['ui:methodPlugins']
                    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ([InspectorPlugin] as any)
                    : undefined
                }
              />
            </Container>
          </>
        }
        inspectorTabComponent={
          <Tabs
            variant="scrollable"
            indicatorColor="primary"
            value={0}
            style={{
              position: 'absolute',
              bottom: '0',
              right: '25px',
              zIndex: 1,
              marginBottom: '0px',
            }}
          >
            <Tab
              onClick={() => setHorizontalSplit(!horizontalSplit)}
              style={{
                background: currentTheme.palette.background.default,
                width: '165px',
                paddingRight: '30px',
                border: `1px solid ${currentTheme.palette.text.primary}`,
              }}
              label={
                <div>
                  <Typography variant="body1">
                    <span role="img" aria-label="inspector">
                      🕵️‍♂️
                    </span>
                    ️ Inspector
                  </Typography>
                  <Tooltip title="Toggle Inspector">
                    <IconButton
                      component="div"
                      style={{ position: 'absolute', right: '5px', top: '20%' }}
                      size="small"
                    >
                      {horizontalSplit ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                  </Tooltip>
                </div>
              }
            ></Tab>
          </Tabs>
        }
        inspectorComponent={
          <Inspector
            hideToggleTheme={true}
            url={
              searchUrlDebounced && searchUrlDebounced.includes('.json')
                ? undefined
                : searchUrlDebounced
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            request={(inspectorContents && (inspectorContents as any).request) || undefined}
            openrpcDocument={parsedSchema}
            transport={
              selectedTransportType.type !== 'plugin' ? selectedTransportType.type : undefined
            }
          />
        }
      />
      <SnackBar
        close={() => setNotification(undefined)}
        notification={notification as ISnackBarNotification}
      />
    </ThemeProvider>
  );
};
export default App;
