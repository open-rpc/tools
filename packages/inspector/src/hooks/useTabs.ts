import * as React from 'react';
import { useState, Dispatch, useEffect } from 'react';
import { OpenrpcDocument } from '@open-rpc/meta-schema';
import { IJSONRPCLog } from '@open-rpc/logs-react';

export interface ITab {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
  logs: IJSONRPCLog[];
  editing?: boolean;
  url?: string;
  openrpcDocument?: OpenrpcDocument;
}

const emptyJSONRPC = {
  jsonrpc: '2.0',
  method: '',
  params: [],
  id: 0,
};

const useTabs = (defaultTabs?: ITab[]) => {
  const [tabIndex, setTabIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tabs, setTabs]: [ITab[], Dispatch<any>] = useState(
    defaultTabs || [{ name: 'New Tab', content: emptyJSONRPC, url: undefined, logs: [] }]
  );

  const handleClose = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (tabs.length === 1) {
      return;
    }
    const t = tabs.filter((tab, i) => i !== index);
    setTabs(t);
  };

  useEffect(() => {
    // If there are no tabs, reset to 0
    if (tabs.length === 0) {
      setTabIndex(0);
      return;
    }

    // If the current index is invalid, set it to the last tab
    if (tabIndex >= tabs.length) {
      setTabIndex(tabs.length - 1);
      return;
    }

    // If the current tab is undefined, something's wrong - reset to last tab
    if (!tabs[tabIndex]) {
      setTabIndex(tabs.length - 1);
    }
  }, [tabs, tabIndex]);

  const setTabName = (tab: ITab, name: string) => {
    const newTabs = tabs.map((innerTab) => {
      if (innerTab === tab) {
        return {
          ...innerTab,
          name,
        };
      }
      return innerTab;
    });
    setTabs(newTabs);
  };

  const setTabEditing = (tab: ITab, editing: boolean) => {
    const newTabs = tabs.map((innerTab) => {
      if (innerTab === tab) {
        return {
          ...innerTab,
          editing,
        };
      }
      return innerTab;
    });
    setTabs(newTabs);
  };

  const setTabOpenRPCDocument = (ti: number, openrpcDocument: OpenrpcDocument | undefined) => {
    const newTabs = tabs.map((innerTab, i) => {
      if (i === ti) {
        if (!openrpcDocument) {
          return {
            name: innerTab.name,
            content: innerTab.content,
            logs: innerTab.logs,
            editing: innerTab.editing,
            url: innerTab.url,
          };
        }
        return {
          ...innerTab,
          openrpcDocument,
        };
      }
      return innerTab;
    });
    setTabs(newTabs);
  };

  const setTabUrl = (ti: number, url: string) => {
    const newTabs = tabs.map((innerTab, i) => {
      if (i === ti) {
        return {
          ...innerTab,
          url,
        };
      }
      return innerTab;
    });
    setTabs(newTabs);
  };

  const setTabLogs = (ti: number, logs: IJSONRPCLog[]) => {
    const newTabs = tabs.map((innerTab, i) => {
      if (i === ti) {
        return {
          ...innerTab,
          logs,
        };
      }
      return innerTab;
    });
    setTabs(newTabs);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setTabContent = (ti: number, content: any) => {
    const newTabs = tabs.map((innerTab, i) => {
      if (i === ti) {
        return {
          ...innerTab,
          content,
        };
      }
      return innerTab;
    });
    setTabs(newTabs);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLabelChange = (ev: any, tab: ITab) => {
    setTabName(tab, ev.target.value);
  };
  return {
    setTabContent,
    setTabEditing,
    setTabIndex,
    setTabName,
    tabs,
    setTabs,
    handleClose,
    tabIndex,
    handleLabelChange,
    setTabUrl,
    setTabLogs,
    setTabOpenRPCDocument,
  };
};

export default useTabs;
