import { JSONRPCError } from '@open-rpc/client-js/build/Error';
import { Dispatch, useEffect, useState } from 'react';
import {
  HTTPTransport,
  WebSocketTransport,
  PostMessageWindowTransport,
  PostMessageIframeTransport,
} from '@open-rpc/client-js';
import { Transport } from '@open-rpc/client-js/build/transports/Transport';
import { IJSONRPCData, IJSONRPCNotificationResponse } from '@open-rpc/client-js/build/Request';
import { JSONSchema } from '@open-rpc/tool-types';

export type TTransport = 'http' | 'websocket' | 'postmessagewindow' | 'postmessageiframe';

export interface IWebTransport {
  type: TTransport;
  name?: string;
  schema?: JSONSchema;
}

export interface IPluginTransport {
  type: 'plugin';
  uri: string;
  name: string;
  transport: ITransport;
}
const getTransportFromType = async (
  uri: string,
  transports: ITransport[],
  transport: ITransport,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transportOptions?: any
): Promise<Transport> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let localTransport: any;
  const localTransportType = transports.find((value) => {
    return value.type === transport.type && value.name === transport.name;
  });
  if (localTransportType?.type === 'websocket') {
    localTransport = new WebSocketTransport(uri);
  } else if (localTransportType?.type === 'http') {
    localTransport = new HTTPTransport(uri, transportOptions);
  } else if (localTransportType?.type === 'postmessageiframe') {
    localTransport = new PostMessageIframeTransport(uri);
  } else if (localTransportType?.type === 'postmessagewindow') {
    localTransport = new PostMessageWindowTransport(uri);
  } else if (localTransportType?.type === 'plugin') {
    const intermediateTransport = await getTransportFromType(
      localTransportType.uri,
      transports,
      localTransportType.transport
    );
    class InterTransport extends Transport {
      public async connect() {
        await intermediateTransport.connect();
        const results = await intermediateTransport.sendData({
          internalID: 0,
          request: {
            jsonrpc: '2.0',
            method: 'connect',
            params: [uri],
            id: 0,
          },
        });
        intermediateTransport.subscribe('notification', (data: IJSONRPCNotificationResponse) => {
          this.transportRequestManager.transportEventChannel.emit('notification', data);
        });
        intermediateTransport.subscribe('error', (data: JSONRPCError) => {
          this.transportRequestManager.transportEventChannel.emit('error', data);
        });
        return results;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      public sendData(data: IJSONRPCData): Promise<any> {
        return intermediateTransport.sendData({
          internalID: 0,
          request: {
            jsonrpc: '2.0',
            method: 'sendData',
            params: [data.request],
            id: 0,
          },
        });
      }
      public close() {
        intermediateTransport.unsubscribe();
        intermediateTransport.sendData({
          internalID: 0,
          request: {
            jsonrpc: '2.0',
            method: 'close',
            params: [],
            id: 0,
          },
        });
        intermediateTransport.close();
      }
    }
    localTransport = new InterTransport();
  }

  return localTransport;
};

export type ITransport = IWebTransport | IPluginTransport;

type TUseTransport = (
  transports: ITransport[],
  url: string,
  defaultTransportType: ITransport,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transportOptions?: any
) => [Transport | undefined, (t: ITransport) => void, JSONRPCError | undefined, boolean];

const useTransport: TUseTransport = (transports, url, defaultTransportType, transportOptions) => {
  const [transport, setTransport] = useState<Transport>();
  const [transportConnected, setTransportConnected] = useState<boolean>(false);
  const [transportType, setTransportType]: [ITransport | undefined, Dispatch<ITransport>] =
    useState(defaultTransportType);
  const [error, setError]: [JSONRPCError | undefined, Dispatch<JSONRPCError | undefined>] =
    useState();
  useEffect(() => {
    if (!transportType) {
      return;
    }
    const doSetTransport = async () => {
      if (transport) {
        transport.unsubscribe();
        transport.close();
      }
      const localTransport = await getTransportFromType(
        url,
        transports,
        transportType,
        transportOptions
      );
      return localTransport
        .connect()
        .then(() => {
          setTransportConnected(true);
          setTransport(localTransport);
        })
        .catch((e) => {
          localTransport.unsubscribe();
          localTransport.close();
          throw e;
        });
    };

    doSetTransport().catch((e: JSONRPCError) => {
      setTransportConnected(false);
      setTransport(undefined);
      setError(e);
    });
  }, [transportType, url, transports, transportOptions]);
  const setSelectedTransportType = async (t: ITransport) => {
    setTransportConnected(false);
    setTransportType(t);
  };
  return [transport, setSelectedTransportType, error, transportConnected];
};

export default useTransport;
