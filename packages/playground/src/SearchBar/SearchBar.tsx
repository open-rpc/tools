import React from "react";
import { InputBase, styled } from "@mui/material";
import { IUISchema } from "../UISchema";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
}));

interface IProps {
  uiSchema?: IUISchema;
  searchBarUrl: string | undefined;
  onChangeUrl?: (value: string) => void;
  onDarkModeChange?: (value: boolean) => void;
  onSplitViewChange?: (value: boolean) => void;
}

const SearchBar: React.FC<IProps> = ({ uiSchema, searchBarUrl, onChangeUrl }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeUrl?.(event.target.value);
  };

  return (
    <StyledInputBase 
      value={searchBarUrl || ""} 
      placeholder={uiSchema?.appBar?.["ui:inputPlaceholder"]}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
