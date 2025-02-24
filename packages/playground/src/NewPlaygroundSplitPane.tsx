import * as React from "react";
import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle, ImperativePanelGroupHandle } from "react-resizable-panels";
import "./PlaygroundSplitPane.css";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./themes/openrpcTheme";

interface IProps {
 /* onChange?: (size: number) => void;
  left: ReactNode;
  right: ReactNode;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  style?: CSSProperties;
  direction?: "horizontal" | "vertical";
  splitLeft?: boolean;
  split?: boolean;
  onlyRenderSplit?: boolean;
  */
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
  useLayoutEffect(() => {
    console.log("resetting default layout")
    if (editorAndDocumentationSplit) {
      containerHorizontalPanelGroupRef.current?.setLayout([50, 50]);
    } else {
      containerHorizontalPanelGroupRef.current?.setLayout([0,100]);
    }
    containerVerticalPanelGroupRef.current?.setLayout([100, 0]);
  }, []);

  useEffect(()=> {
    if (!showInspector) {
      console.log("hide inspector", showInspector);
      containerVerticalPanelGroupRef.current?.setLayout([100, 0]);
    } else {
      console.log("show inspector", showInspector);
      containerVerticalPanelGroupRef.current?.setLayout([50, 50]);
    }
    if (editorAndDocumentationSplit) {
      console.log("editor and documentation split 50/50", editorAndDocumentationSplit);
      containerHorizontalPanelGroupRef.current?.setLayout([50, 50]);
    } else {
      console.log(" documentation only", editorAndDocumentationSplit);
      containerHorizontalPanelGroupRef.current?.setLayout([0,100]);
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
