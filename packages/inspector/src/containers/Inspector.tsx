import * as React from 'react';
import { useState, useEffect, Dispatch, useLayoutEffect } from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelGroupHandle,
} from 'react-resizable-panels';
import JSONRPCRequestEditor from './JSONRPCRequestEditor';
import PlayCircle from '@mui/icons-material/PlayCircleFilled';
import CloseIcon from '@mui/icons-material/Close';
import FlashOn from '@mui/icons-material/FlashOn';
import FlashOff from '@mui/icons-material/FlashOff';
import History from '@mui/icons-material/History';
import Keyboard from '@mui/icons-material/Keyboard';
import { MonacoEditor } from '@open-rpc/monaco-editor-react';
import PlusIcon from '@mui/icons-material/Add';
import DocumentIcon from '@mui/icons-material/Description';

import {
  IconButton,
  AppBar,
  Button,
  Toolbar,
  Typography,
  InputBase,
  Tab,
  Tabs,
  Tooltip,
  Dialog,
  List,
  ListItemText,
  Container,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import createPersistedState from 'use-persisted-state';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { JSONRPCError } from '@open-rpc/client-js/build/Error';
import { OpenrpcDocument, ExampleObject } from '@open-rpc/meta-schema';
import useTabs, { ITab } from '../hooks/useTabs';
import { useDebounce } from 'use-debounce';
import { green } from '@mui/material/colors';
import { parseOpenRPCDocument } from '@open-rpc/schema-utils-js';
import { TransportDropdown } from '../components/TransportDropdown';
import useTransport, { ITransport, IWebTransport, TTransport } from '../hooks/useTransport';
import { JSONRPCLogger, IJSONRPCLog } from '@open-rpc/logs-react';
import OptionsEditor from './OptionsEditor';
import ListItemButton from '@mui/material/ListItemButton';
import useDarkMode from 'use-dark-mode';

const useCustomTransportList = createPersistedState('inspector-custom-transports');

const defaultTransports: ITransport[] = [
  {
    type: 'http',
    name: 'HTTP',
    schema: {
      type: 'object',
      properties: {
        headers: {
          patternProperties: {
            '': {
              type: 'string',
            },
          },
        },
        credentials: {
          type: 'string',
          enum: ['omit', 'same-origin', 'include'],
        },
      },
      examples: [
        {
          headers: {},
        },
      ],
    },
  },
  {
    type: 'websocket',
    name: 'WebSocket',
  },
  {
    type: 'postmessagewindow',
    name: 'PostMessageWindow',
  },
  {
    type: 'postmessageiframe',
    name: 'PostMessageIframe',
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const errorToJSON = (error: JSONRPCError | any, id?: string | number | null): any => {
  const isError = error instanceof Error;
  if (!isError) {
    return;
  }
  if (!error) {
    return;
  }
  const emptyErrorResponse = {
    jsonrpc: '2.0',
    id,
  };
  // this is an internal wrapped client-js error

  if ((error as any).data instanceof Error) {
    return {
      ...emptyErrorResponse,
      error: {
        code: (error as any).data.code,
        message: (error as any).data.message,
        data: (error as any).data.data,
      },
    };
  }
  return {
    ...emptyErrorResponse,
    error: {
      code: (error as any).code,
      message: (error as any).message,
      data: (error as any).data,
    },
  };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface IProps {
  url?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
  darkMode?: boolean;
  hideToggleTheme?: boolean;
  openrpcDocument?: OpenrpcDocument;
  transport?: TTransport;
  customTransport?: ITransport;
  onToggleDarkMode?: () => void;
}

const emptyJSONRPC = {
  jsonrpc: '2.0',
  method: '',
  params: [],
  id: 0,
};

const Inspector: React.FC<IProps> = (props: IProps) => {
  const {
    setTabContent,
    setTabEditing,
    setTabIndex,
    tabs,
    setTabs,
    handleClose,
    tabIndex,
    setTabUrl,
    handleLabelChange,
  } = useTabs([
    {
      name: props.request ? props.request.method : 'New Tab',
      content: props.request || { ...emptyJSONRPC },
      logs: [],
      url: props.url || '',
      openrpcDocument: props.openrpcDocument,
    },
  ]);
  const [openrpcDocument, setOpenRpcDocument] = useState(props.openrpcDocument);
  const [json, setJson] = useState(
    props.request || {
      jsonrpc: '2.0',
      method: '',
      params: [],
      id: 0,
    }
  );
  const [transportList, setTransportList] = useCustomTransportList(() => {
    if (props.customTransport) {
      return [...defaultTransports, props.customTransport];
    }
    return defaultTransports;
  });
  const [url, setUrl] = useState(props.url || '');
  const [debouncedUrl] = useDebounce(url, 1000);
  const [selectedTransport, setSelectedTransport] = useState(
    props.customTransport || defaultTransports[0]
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transportOptions, setTransportOptions] = useState<any>();
  const [debouncedtransportOptions] = useDebounce(transportOptions, 1000);
  const [transport, setTransport, , connected] = useTransport(
    transportList as ITransport[],
    debouncedUrl,
    props.customTransport || defaultTransports[0],
    debouncedtransportOptions
  );

  const [historyOpen, setHistoryOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [requestHistory, setRequestHistory]: [any[], Dispatch<any>] = useState([]);
  const [historySelectedIndex, setHistorySelectedIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [logs, setLogs] = useState<any[]>([]);
  const horizontalPanelGroupRef = React.useRef<ImperativePanelGroupHandle>(null);
  const verticalPanelGroupRef = React.useRef<ImperativePanelGroupHandle>(null);

  useEffect(() => {
    setTabs([
      ...tabs,
      {
        name: props.request ? props.request.method || 'New Tab' : 'New Tab',
        content: props.request || JSON.stringify({ ...emptyJSONRPC }, null, 2),
        url: props.url,
        openrpcDocument,
      },
    ]);
    setTabIndex(tabs.length);
  }, [props.request]);

  useEffect(() => {
    if (selectedTransport !== undefined) {
      setTransport(selectedTransport);
      const s: IWebTransport = selectedTransport as IWebTransport;
      if (s.schema !== undefined && s.schema !== true && s.schema !== false) {
        setTransportOptions((s.schema.examples as ExampleObject[])[0]);
      }
    }
  }, [selectedTransport]);

  useEffect(() => {
    if (json) {
      setTabContent(tabIndex, json);
    }
  }, [json]);

  useEffect(() => {
    if (props.transport) {
      const t = transportList as ITransport[];
      const tIndex = t.findIndex(
        (tp: ITransport) => tp.name?.toLowerCase() === props.transport?.toLowerCase()
      );
      if (tIndex !== -1) {
        setSelectedTransport(t[tIndex]);
      }
    }
  }, [props.transport]);

  useEffect(() => {
    if (props.url) {
      setUrl(props.url);
      setTabUrl(tabIndex, props.url);
    }
  }, [props.url]);

  useLayoutEffect(() => {
    horizontalPanelGroupRef.current?.setLayout([50, 50]);
    if ((selectedTransport as IWebTransport).schema) {
      verticalPanelGroupRef.current?.setLayout([85, 15]);
    } else {
      verticalPanelGroupRef.current?.setLayout([100]);
    }
  }, [selectedTransport]);

  const handlePlayButton = async () => {
    let requestTimestamp = new Date();
    if (transport) {
      try {
        requestTimestamp = new Date();
        const result = await transport.sendData({
          internalID: json.id,
          request: json,
        });
        const responseTimestamp = new Date();
        const r = { jsonrpc: '2.0', result, id: json.id };
        const reqObj: IJSONRPCLog = {
          type: 'request',
          method: json.method,
          timestamp: requestTimestamp,
          payload: json,
        };
        const resObj: IJSONRPCLog = {
          type: 'response',
          method: json.method,
          timestamp: responseTimestamp,
          payload: r,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newHistory: any = [...requestHistory, { ...tabs[tabIndex] }];
        setRequestHistory(newHistory);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setLogs((prevLogs: any) => [...prevLogs, reqObj, resObj]);
        setTabs((prevTabs: ITab[]) =>
          prevTabs.map((tab: ITab, i: number) =>
            i === tabIndex ? { ...tab, logs: [...(tab.logs || []), reqObj, resObj] } : tab
          )
        );
      } catch (e) {
        const responseTimestamp = new Date();
        const convertedError = errorToJSON(e, json.id);
        const reqObj: IJSONRPCLog = {
          type: 'request',
          method: json.method,
          timestamp: requestTimestamp,
          payload: json,
        };
        const resObj: IJSONRPCLog = {
          type: 'response',
          method: json.method,
          timestamp: responseTimestamp,
          payload: convertedError,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newHistory: any = [...requestHistory, { ...tabs[tabIndex] }];
        setRequestHistory(newHistory);
        setLogs((prevLogs) => [...prevLogs, reqObj, resObj]);
        setTabs((prevTabs: ITab[]) =>
          prevTabs.map((tab: ITab, i: number) =>
            i === tabIndex ? { ...tab, logs: [...(tab.logs || []), reqObj, resObj] } : tab
          )
        );
      }
    }
  };

  const clear = () => {
    setLogs([]);
    setTabs((prevTabs: ITab[]) =>
      prevTabs.map((tab: ITab, i: number) => (i === tabIndex ? { ...tab, logs: [] } : tab))
    );
  };

  const handleClearButton = () => {
    clear();
  };

  const handleToggleDarkMode = () => {
    if (props.onToggleDarkMode) {
      props.onToggleDarkMode();
    }
  };
  const refreshOpenRpcDocument = async () => {
    // Don't proceed if the current tab doesn't exist
    if (!tabs[tabIndex]) {
      return;
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
      const doc = await parseOpenRPCDocument(d);
      setOpenRpcDocument(doc);
      setTabs((prevTabs: ITab[]) =>
        prevTabs.map((tab: ITab, i: number) =>
          i === tabIndex ? { ...tab, openrpcDocument: doc } : tab
        )
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (_e: any) {
      if (!props.openrpcDocument) {
        setOpenRpcDocument(undefined);
        setTabs((prevTabs: ITab[]) =>
          prevTabs.map((tab: ITab, i: number) =>
            i === tabIndex ? { ...tab, openrpcDocument: undefined } : tab
          )
        );
      }
    }
    if (transport) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transport.subscribe('notification', (notification: any) => {
        const responseTimestamp = new Date();
        const notificationObj: IJSONRPCLog = {
          type: 'response',
          notification: true,
          method: notification.method,
          timestamp: responseTimestamp,
          payload: notification,
        };
        setLogs((prevLogs: IJSONRPCLog[]) => [...prevLogs, notificationObj]);
        setTabs((prevTabs: ITab[]) => {
          // Don't update if the target tab no longer exists
          if (!prevTabs[tabIndex]) {
            return prevTabs;
          }
          return prevTabs.map((tab: ITab, i: number) =>
            i === tabIndex ? { ...tab, logs: [...(tab.logs || []), notificationObj] } : tab
          );
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transport.subscribe('error', (error: any) => {
        const responseTimestamp = new Date();
        const notificationObj: IJSONRPCLog = {
          type: 'response',
          method: '',
          timestamp: responseTimestamp,
          payload: errorToJSON(error, null),
        };
        setLogs((prevLogs: IJSONRPCLog[]) => [...prevLogs, notificationObj]);
        setTabs((prevTabs: ITab[]) => {
          // Don't update if the target tab no longer exists
          if (!prevTabs[tabIndex]) {
            return prevTabs;
          }
          return prevTabs.map((tab: ITab, i: number) =>
            i === tabIndex ? { ...tab, logs: [...(tab.logs || []), notificationObj] } : tab
          );
        });
      });
    }
  };

  useEffect(() => {
    if (!props.openrpcDocument) {
      setOpenRpcDocument(undefined);
    }
    // Only try to refresh if we have a valid tab
    if (tabs[tabIndex]) {
      try {
        refreshOpenRpcDocument();
      } catch (e) {
        console.warn('Failed to refresh openrpc document', e);
      }
    }
  }, [transport, tabIndex]);

  useEffect(() => {
    if (tabs[tabIndex]) {
      setJson(tabs[tabIndex].content);
      setUrl(tabs[tabIndex].url || '');
      setLogs(tabs[tabIndex].logs || []);
    }
  }, [tabIndex]);

  useEffect(() => {
    setOpenRpcDocument(props.openrpcDocument);
    setTabs((prevTabs: ITab[]) =>
      prevTabs.map((tab: ITab, i: number) =>
        i === tabIndex ? { ...tab, openrpcDocument: props.openrpcDocument } : tab
      )
    );
  }, [props.openrpcDocument]);

  useEffect(() => {
    if (!historyOpen) {
      handlePlayButton();
    }
  }, [historyOpen]);

  const handleTabIndexChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setTabIndex(newValue);
  };

  const onHistoryPlayClick = () => {
    if (requestHistory[historySelectedIndex]) {
      setJson(requestHistory[historySelectedIndex].content);
      setUrl(requestHistory[historySelectedIndex].url);
      setOpenRpcDocument(requestHistory[historySelectedIndex].openrpcDocument);
      setHistoryOpen(false);
    }
  };

  const handleTransportOptionsChange = (optionsString: string) => {
    try {
      setTransportOptions(JSON.parse(optionsString));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // cannot parse transport options
    }
  };

  const darkMode = useDarkMode();

  return (
    <>
      <Dialog
        onClose={() => setHistoryOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={historyOpen}
      >
        <Container maxWidth="sm">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: '30px', paddingTop: '10px', paddingBottom: '10px' }}
          >
            <Typography color="textPrimary">History</Typography>
            {requestHistory.length === 0 ? null : (
              <Tooltip title="Use">
                <IconButton onClick={onHistoryPlayClick}>
                  <PlayCircle />
                </IconButton>
              </Tooltip>
            )}
          </Grid>

          {requestHistory.length === 0 ? (
            <Typography style={{ padding: '30px' }}>No History Yet.</Typography>
          ) : (
            <Grid container style={{ paddingBottom: '30px' }}>
              <List
                style={{ padding: '10px', overflowY: 'scroll', height: '250px', width: '200px' }}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {requestHistory.map((requestHistoryItem: any, historyIndex: number) => (
                  <ListItemButton
                    key={`history-${historyIndex}`}
                    selected={historyIndex === historySelectedIndex}
                    onClick={() => setHistorySelectedIndex(historyIndex)}
                  >
                    <ListItemText
                      primary={requestHistoryItem.content.method || 'Empty Method'}
                      secondary={requestHistoryItem.url || 'Empty Url'}
                    />
                  </ListItemButton>
                ))}
              </List>
              <MonacoEditor
                width="300px"
                height="250px"
                options={{
                  theme: darkMode.value ? 'vs-dark' : 'vs',
                }}
                value={
                  requestHistory[historySelectedIndex]
                    ? JSON.stringify(requestHistory[historySelectedIndex].content, null, 4)
                    : ''
                }
                language="json"
                onMount={() => {
                  // noop
                }}
              />
            </Grid>
          )}
        </Container>
      </Dialog>
      <div style={{ position: 'relative' }}>
        <Tabs
          style={{ background: 'transparent' }}
          value={tabIndex}
          variant="scrollable"
          indicatorColor="primary"
          onChange={handleTabIndexChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`tab-${index}`}
              disableRipple
              style={{
                border: 'none',
                outline: 'none',
                userSelect: 'none',
              }}
              component="div"
              onDoubleClick={() => setTabEditing(tab, true)}
              label={
                <div style={{ userSelect: 'none' }}>
                  {tab.editing ? (
                    <InputBase
                      key={`tab-label-input-${index}`}
                      value={tab.name}
                      onChange={(ev) => handleLabelChange(ev, tab)}
                      onBlur={() => setTabEditing(tab, false)}
                      autoFocus
                      style={{ maxWidth: '80px', marginRight: '25px' }}
                    />
                  ) : (
                    <Typography
                      key={`tab-label-text-${index}`}
                      style={{ display: 'inline', textTransform: 'none', marginRight: '25px' }}
                      variant="body1"
                    >
                      {tab.name}
                    </Typography>
                  )}
                  {tabIndex === index ? (
                    <Tooltip key={`tab-close-${index}`} title="Close Tab">
                      <IconButton
                        key={`tab-close-btn-${index}`}
                        component="div"
                        onClick={(ev: React.MouseEvent<HTMLElement>) => handleClose(ev, index)}
                        style={{ position: 'absolute', right: '0px', top: '25%' }}
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </div>
              }
            ></Tab>
          ))}
          <Tab
            key={`tab-new`}
            disableRipple
            style={{ minWidth: '50px' }}
            component="div"
            label={
              <Tooltip title="Create New Tab">
                <IconButton
                  onClick={() => {
                    // Create the new tab first
                    const newTab = {
                      name: 'New Tab',
                      content: { ...emptyJSONRPC, id: 0 },
                      logs: [],
                      openrpcDocument,
                      url,
                    };
                    // Update tabs using functional update to ensure we have latest state
                    setTabs((prevTabs: ITab[]) => {
                      const newTabs = [...prevTabs, newTab];
                      // Schedule the index update after state is committed
                      setTimeout(() => setTabIndex(newTabs.length - 1), 0);
                      return newTabs;
                    });
                  }}
                >
                  <PlusIcon style={{ transform: 'scale(1)' }} />
                </IconButton>
              </Tooltip>
            }
          ></Tab>
        </Tabs>
      </div>

      <AppBar elevation={0} position="static" style={{ zIndex: 1 }}>
        <Toolbar>
          <img
            height="30"
            alt="openrpc-logo"
            style={{ marginRight: '10px' }}
            src="https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png" //tslint:disable-line
          />
          <Typography variant="h6" color="textSecondary">
            Inspector
          </Typography>

          <TransportDropdown
            transports={transportList as ITransport[]}
            onAddTransport={(addedTransport: ITransport) => {
              setTransportList((prevList: ITransport[]) => [...prevList, addedTransport]);
            }}
            selectedTransport={selectedTransport}
            onChange={(changedTransport) => setSelectedTransport(changedTransport)}
            style={{
              marginLeft: '10px',
            }}
          />
          <Tooltip title="Play">
            <IconButton component="div" onClick={handlePlayButton}>
              <PlayCircle fontSize="large" />
            </IconButton>
          </Tooltip>
          <InputBase
            startAdornment={
              <>
                <Tooltip title={connected ? 'Connected' : 'Not Connected'}>
                  {connected ? (
                    <FlashOn style={{ color: green[500] }} />
                  ) : (
                    <FlashOff color="error" />
                  )}
                </Tooltip>
                {openrpcDocument ? (
                  <Tooltip
                    title={
                      <div style={{ textAlign: 'center' }}>
                        <Typography>OpenRPC Document Detected</Typography>
                        <Typography variant="caption">
                          A JSON-RPC endpoint may respond to the rpc.discover method or a provide a
                          static document. This adds features like auto completion to the inspector.
                        </Typography>
                      </div>
                    }
                    onClick={() =>
                      window.open('https://spec.open-rpc.org/#service-discovery-method')
                    }
                  >
                    <DocumentIcon
                      style={{
                        color: green[500],
                        marginRight: '5px',
                        cursor: 'pointer',
                        transform: 'scale(1)',
                      }}
                    />
                  </Tooltip>
                ) : null}
              </>
            }
            value={url}
            placeholder="Enter a JSON-RPC server URL"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUrl(event.target.value);
              setTabUrl(tabIndex, event.target.value);
            }}
            fullWidth
            style={{
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
              padding: '0px 10px',
              marginRight: '5px',
            }}
          />
          <Tooltip title="History">
            <IconButton onClick={() => setHistoryOpen(true)}>
              <History />
            </IconButton>
          </Tooltip>
          {props.hideToggleTheme ? null : (
            <Tooltip title="Toggle Theme">
              <IconButton onClick={handleToggleDarkMode}>
                {props.darkMode ? <Brightness3Icon /> : <WbSunnyIcon />}
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <PanelGroup
        ref={horizontalPanelGroupRef}
        direction="horizontal"
        style={{
          display: 'flex',
          height: 'calc(100vh - 128px)',
        }}
      >
        <Panel
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <PanelGroup
            ref={verticalPanelGroupRef}
            direction="vertical"
            style={{
              display: 'flex',
              height: '100%',
            }}
          >
            <Panel style={{ overflow: 'auto', minHeight: 0 }}>
              <JSONRPCRequestEditor
                onChange={(val) => {
                  let jsonResult;
                  try {
                    jsonResult = JSON.parse(val);
                  } catch (e) {
                    console.warn(e);
                  }
                  if (jsonResult) {
                    setJson(jsonResult);
                    setTabContent(tabIndex, jsonResult);
                  }
                }}
                openrpcDocument={openrpcDocument}
                value={JSON.stringify(json, null, 4)}
              />
            </Panel>
            {(selectedTransport as IWebTransport).schema && (
              <>
                <PanelResizeHandle className="resize-handle" />
                <Panel style={{ overflow: 'auto', minHeight: 0 }}>
                  <OptionsEditor
                    schema={(selectedTransport as IWebTransport).schema}
                    value={JSON.stringify(transportOptions, null, 4)}
                    onChange={handleTransportOptionsChange}
                  />
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            minHeight: 0,
            position: 'relative',
          }}
        >
          {logs.length > 0 && (
            <Button
              variant="contained"
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '5px',
                right: '50px',
                zIndex: 2,
                background: 'rgba(255,255,255,0.2)',
              }}
              onClick={handleClearButton}
            >
              Clear
            </Button>
          )}
          {logs.length === 0 ? (
            <Container maxWidth="sm">
              <Grid container justifyContent="center" style={{ paddingTop: '40px' }}>
                <Typography gutterBottom>Press the Play button to see the results here.</Typography>
                <Typography>
                  Use&nbsp;
                  <Button
                    startIcon={<Keyboard />}
                    variant="contained"
                    disabled
                    size="small"
                    style={{ marginRight: '3px' }}
                  >
                    CTRL + SPACE
                  </Button>
                  to auto-complete in the editor.
                </Typography>
              </Grid>
            </Container>
          ) : (
            <div style={{ height: '100%' }}>
              <JSONRPCLogger
                sidebarOpen={false}
                openrpcDocument={openrpcDocument}
                logs={logs}
                sidebarAlign={'right'}
                openRecentPayload={true}
              />
            </div>
          )}
        </Panel>
      </PanelGroup>
    </>
  );
};

export default Inspector;
