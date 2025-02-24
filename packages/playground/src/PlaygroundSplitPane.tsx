import * as React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { CSSProperties } from "react";
import { Panel, PanelGroup, PanelResizeHandle, ImperativePanelGroupHandle } from "react-resizable-panels";
import "./PlaygroundSplitPane.css";

interface IProps {
  onChange?: (size: number) => void;
  left: ReactNode;
  right: ReactNode;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  style?: CSSProperties;
  direction?: "horizontal" | "vertical";
  splitLeft?: boolean;
  split?: boolean;
  onlyRenderSplit?: boolean;
}

const PlaygroundSplitPane: React.FC<IProps> = ({
  onChange,
  left,
  right,
  leftStyle,
  rightStyle,
  style,
  direction = "vertical",
  splitLeft,
  split,
  onlyRenderSplit,
}) => {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  useEffect(() => {
    console.log("panelGroupRef", panelGroupRef.current);
    panelGroupRef.current?.setLayout([50, 50]);
  }, []);
  // If split is false and onlyRenderSplit is true, render just one side
  if (split === false && onlyRenderSplit) {
    return (
      <div style={splitLeft ? leftStyle : rightStyle}>
        {splitLeft ? left : right}
      </div>
    );
  }


  const handleLayout = (sizes: number[]) => {
    //onChange?.(sizes[0]); // Pass the first panel's size to onChange
  };

  return (
    <PanelGroup
      ref={panelGroupRef}
      direction={direction}
      style={{
        ...style,
        height: "calc(100vh)",
        width: "100%",
        display: "flex",
        backgroundColor: "red",
      }}
      onLayout={handleLayout}
    >
      <Panel
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          minHeight: 0,
          backgroundColor: "blue",
          ...leftStyle,
        }}
      >
        {left}
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel
        defaultSize={50}
        style={{
          minHeight: 0,
          ...rightStyle,
        }}
      >
        {right}
      </Panel>
    </PanelGroup>
  );
};

export default PlaygroundSplitPane;
