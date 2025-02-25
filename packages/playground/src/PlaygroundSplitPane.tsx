import * as React from "react";
import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle, ImperativePanelGroupHandle } from "react-resizable-panels";
import "./PlaygroundSplitPane.css";

interface IProps {
 showInspector?: boolean
 editorAndDocumentationSplit?: boolean
 inspectorComponent?: ReactNode
 editorComponent: ReactNode
 documentationComponent?: ReactNode
 inspectorTabComponent?: ReactNode
}

const NewPlaygroundSplitPane: React.FC<IProps> = ({ showInspector, inspectorComponent, editorComponent, documentationComponent, editorAndDocumentationSplit, inspectorTabComponent }: IProps) => {
  const containerHorizontalPanelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const containerVerticalPanelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  
  // Safe function to set layout only if the panel group is properly initialized
  const safeSetLayout = (ref: React.RefObject<ImperativePanelGroupHandle>, layout: number[]) => {
    try {
      if (ref.current) {
        ref.current.setLayout(layout);
      }
    } catch (e) {
      // Silently catch errors in test environment
      if (process.env.NODE_ENV !== 'test') {
        console.error('Error setting panel layout:', e);
      }
    }
  };
  
  useLayoutEffect(() => {
    if (editorAndDocumentationSplit) {
      safeSetLayout(containerHorizontalPanelGroupRef, [50, 50]);
    } else {
      safeSetLayout(containerHorizontalPanelGroupRef, [0, 100]);
    }
    safeSetLayout(containerVerticalPanelGroupRef, [100, 0]);
  }, []);

  useEffect(()=> {
    if (!showInspector) {
      safeSetLayout(containerVerticalPanelGroupRef, [100, 0]);
    } else {
      safeSetLayout(containerVerticalPanelGroupRef, [50, 50]);
    }
    if (editorAndDocumentationSplit) {
      safeSetLayout(containerHorizontalPanelGroupRef, [50, 50]);
    } else {
      safeSetLayout(containerHorizontalPanelGroupRef, [0, 100]);
    }
  }, [showInspector, editorAndDocumentationSplit]);

  return (
    <PanelGroup direction="vertical"
    ref={containerVerticalPanelGroupRef}
    >
      <Panel>
    <PanelGroup
      ref={containerHorizontalPanelGroupRef}
      direction="horizontal"
      style={{
        height: "100%",
        width: "100%",
        paddingTop: "58px",
        display: "flex"
      }}
    >
      <Panel
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "auto"
        }}
      >
        {editorComponent}
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          minHeight: 0,
          position: "relative"
        }}
      >
          {documentationComponent}
      </Panel>
    </PanelGroup>
    </Panel>
      <PanelResizeHandle className="resize-handle" style={{position: "relative"}} >
        {inspectorTabComponent}
      </PanelResizeHandle>
    <Panel>
      <div style={{
        height: "94%",
        width: "100%",
        paddingBottom: "58px",
        overflowY: "auto",
      }}>
        {inspectorComponent}
      </div>
    </Panel>
    </PanelGroup>
  );
};

export default NewPlaygroundSplitPane;
