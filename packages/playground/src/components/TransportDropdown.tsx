import React, { useState, ChangeEvent } from "react";
import { 
  Button, 
  Menu, 
  MenuItem, 
  Typography, 
  Dialog, 
  Container, 
  InputBase,
  styled 
} from "@mui/material";
import { CSSProperties } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ITransport } from "../hooks/useTransport";
import Grid from "@mui/material/Grid2";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  display: "block",
  background: "rgba(0,0,0,0.1)",
  borderRadius: "4px",
  padding: "0px 10px",
  marginRight: "5px",
}));

interface IProps {
  transports?: ITransport[];
  selectedTransport?: ITransport;
  onChange?: (changedTransport: ITransport) => void;
  onAddTransport?: (addedTransport: ITransport) => void;
  style?: CSSProperties;
}

const TransportDropdown: React.FC<IProps> = ({ selectedTransport, transports, onChange, style, onAddTransport }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (transport: ITransport) => {
    setAnchorEl(null);
    onChange?.(transport);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [selectedCustomTransport, setSelectedCustomTransport] = useState<ITransport | undefined>();
  const [customTransportName, setCustomTransportName] = useState<string | undefined>();
  const [customTransportUri, setCustomTransportUri] = useState<string | undefined>();

  const [dialogMenuAnchorEl, setDialogMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleDialogAnchorClose = () => {
    setDialogMenuAnchorEl(null);
  };
  const handleDialogCustomTransportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDialogMenuAnchorEl(event.currentTarget);
  };

  const handleCustomTransportDialogMenuItemClick = (transport: ITransport) => {
    setDialogMenuAnchorEl(null);
    setSelectedCustomTransport(transport);
  };

  const handleSubmitCustomTransport = () => {
    setDialogMenuAnchorEl(null);
    if (selectedCustomTransport && customTransportName && customTransportUri) {
      const t: ITransport = {
        type: "plugin",
        transport: selectedCustomTransport,
        name: customTransportName,
        uri: customTransportUri,
      };
      onAddTransport?.(t);
      setDialogOpen(false);
    }
  };

  return (
    <div style={style}>
      <Dialog onClose={() => setDialogOpen(false)} aria-labelledby="simple-dialog-title" open={dialogOpen}>
        <Container maxWidth="sm">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ 
              padding: "30px", 
              paddingTop: "10px", 
              paddingBottom: "10px", 
              marginTop: "10px" 
            }}
          >
            <Typography variant="h6">Custom Transport Plugin</Typography>
            <Typography variant="caption" gutterBottom>
              Transport plugins are created by implementing the &quot;connect&quot;,
              &quot;sendData&quot;, and &quot;close&quot; methods over JSON-RPC.
            </Typography>
            <Grid container direction="column" spacing={1}>
              <Grid>
                <StyledInputBase 
                  placeholder="Plugin Name"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCustomTransportName(event.target.value);
                  }}
                />
              </Grid>
              <Grid>
                <StyledInputBase 
                  placeholder="Plugin URI"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCustomTransportUri(event.target.value);
                  }}
                />
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  onClick={handleDialogCustomTransportClick}
                >
                  {selectedCustomTransport ? selectedCustomTransport.name : "Select A Transport"}
                </Button>
              </Grid>
            </Grid>
            <Menu
              id="playground-transport-menu"
              anchorEl={dialogMenuAnchorEl}
              open={Boolean(dialogMenuAnchorEl)}
              onClose={handleDialogAnchorClose}
            >
              {transports?.filter((value) => value.type !== "plugin").map((transport) => (
                <MenuItem
                  key={`playground-transport-${transport.name}`}
                  onClick={() => handleCustomTransportDialogMenuItemClick(transport)}
                >
                  {transport.name}
                </MenuItem>
              ))}
            </Menu>
            <Button
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={handleSubmitCustomTransport}
              disabled={!customTransportName || !customTransportUri || !selectedCustomTransport}
              variant="contained"
            >
              Add Transport
            </Button>
          </Grid>
        </Container>
      </Dialog>
      <Button
        sx={{
          marginRight: "10px",
          marginLeft: "5px",
        }}
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        {selectedTransport?.name}
      </Button>
      <Menu
        id="playground-transport-menu-2"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {transports?.map((transport) => (
          <MenuItem 
            key={`playground-transport-${transport.name}-2`} 
            onClick={() => handleMenuItemClick(transport)}
          >
            {transport.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setDialogOpen(true)}>
          <AddIcon sx={{ marginRight: "5px" }} />
          <Typography variant="caption">Add Transport</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TransportDropdown;
