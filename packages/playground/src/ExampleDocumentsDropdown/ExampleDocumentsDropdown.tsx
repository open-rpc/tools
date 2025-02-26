import * as React from "react";
import { Menu, MenuItem, Tooltip, Button, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grid from "@mui/material/Grid2";
export interface IExample {
  name: "string";
  url: "string";
}

interface IProps {
  onChange?: (example: IExample) => void;
  examples?: IExample[];
}

const ExampleDocumentsDropdown: React.FC<IProps> = ({ examples, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (example: IExample) => {
    setAnchorEl(null);
    onChange?.(example);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!examples) {
    return null;
  }

  return (
    <>
      <Tooltip title={process.env.REACT_APP_EXAMPLE_DOCUMENTS_DROPDOWN_TITLE || "Example OpenRPC Documents"}>
        <Button
          onClick={handleClick}
          variant="outlined"
          endIcon={<ArrowDropDownIcon />}
          sx={{ 
            height: "38px", 
            fontSize: "11px", 
            marginLeft: "10px" 
          }}
        >
          {process.env.REACT_APP_EXAMPLE_DOCUMENTS_DROPDOWN_TEXT || "examples"}
        </Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ maxWidth: "525px" }}>
          {examples.map((example: IExample) => (
            <MenuItem key={example.name} onClick={() => handleMenuItemClick(example)}>
              <Grid container spacing={0}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle1">{example.name}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" sx={{ fontSize: "9px" }}>{example.url}</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
};

export default ExampleDocumentsDropdown;
