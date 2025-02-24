import React from "react";
import { styled } from "@mui/material/styles";
import { editor } from "monaco-editor";

const StyledWrapper = styled('div')(({ theme }) => ({
  maxHeight: "200px",
}));

const StyledList = styled('ul')(({ theme }) => ({
  color: theme.palette.secondary.main,
  height: "100%",
  listStyle: "none",
  overflow: "scroll",
}));

interface IProps {
  markers: editor.IMarker[];
}

const JSONValidationErrorList: React.FC<IProps> = ({ markers }) => {
  if (!markers || markers.length === 0) {
    return null;
  }

  return (
    <StyledWrapper>
      <StyledList>
        {markers.map((marker) => (
          <li key={marker.message}>
            {marker.startLineNumber}:{marker.startColumn} - {marker.message}
          </li>
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

export default JSONValidationErrorList;
