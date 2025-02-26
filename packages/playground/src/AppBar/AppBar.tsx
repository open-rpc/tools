import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import EditIcon from "@mui/icons-material/Edit";
import { IUISchema } from "../UISchema";
import SearchBar from "../SearchBar/SearchBar";
import ExampleDocumentsDropdown, { IExample } from "../ExampleDocumentsDropdown/ExampleDocumentsDropdown";
import { ITransport } from "../hooks/useTransport";
import TransportDropdown from "../components/TransportDropdown";

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

interface IProps {
  uiSchema?: IUISchema;
  examples?: IExample[];
  transportList?: ITransport[];
  selectedTransport?: ITransport;
  searchBarUrl?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeUrl?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDarkModeChange?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSplitViewChange?: (split: boolean) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onExampleDocumentsDropdownChange?: (example: IExample) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTransportAdd: (transport: ITransport) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTransportChange: (transport: ITransport) => any;
}

const ApplicationBar: React.FC<IProps> = ({
  uiSchema,
  onSplitViewChange,
  onDarkModeChange,
  examples,
  onExampleDocumentsDropdownChange,
  searchBarUrl,
  onChangeUrl,
  transportList,
  selectedTransport,
  onTransportAdd,
  onTransportChange,
}) => {
  return (
    <AppBar position="fixed" color="default" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center" style={{width: "100%", height: "100%"}}>
          <Grid size={{ xs: 6, sm: 6, md: 2 }} container direction="row">
            {uiSchema?.appBar?.["ui:logoUrl"] && (
              <Grid>
                <img
                  alt="playground-title"
                  height="30"
                  src={uiSchema.appBar["ui:logoUrl"]}
                />
              </Grid>
            )}
           <Grid style={{ overflow: "hidden" }}>
              <StyledTitle variant="h6">
                {uiSchema?.appBar?.["ui:title"]}
              </StyledTitle>
            </Grid>
          </Grid>
          <Grid
            size={{sm: 8 }}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {uiSchema?.appBar?.["ui:transports"] && (
              <Grid>
                <TransportDropdown
                  transports={transportList}
                  onAddTransport={onTransportAdd}
                  selectedTransport={selectedTransport}
                  onChange={onTransportChange}
                  style={{ marginLeft: "10px" }}
                />
              </Grid>
            )}
            <Grid size={{ sm: 6 }}>
              {uiSchema?.appBar?.["ui:input"] && (
                <Paper
                  sx={{
                    background: "rgba(0, 0, 0, 0.1)",
                    padding: "0px 10px 0px 10px",
                    width: "100%",
                  }}
                  elevation={0}
                >
                  <SearchBar
                    searchBarUrl={searchBarUrl}
                    onChangeUrl={onChangeUrl}
                    uiSchema={uiSchema}
                  />
                </Paper>
              )}
            </Grid>
            {uiSchema?.appBar?.["ui:examplesDropdown"] && (
              <ExampleDocumentsDropdown
                examples={examples}
                onChange={onExampleDocumentsDropdownChange}
              />
            )}
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 2 }} container justifyContent="flex-end" alignItems="center">
            {uiSchema?.appBar?.["ui:edit"] && (
              uiSchema?.appBar?.["ui:splitView"] ? (
                <Tooltip title="Full Screen">
                  <IconButton onClick={() => onSplitViewChange?.(false)}>
                    <FullscreenIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Edit">
                  <IconButton onClick={() => onSplitViewChange?.(true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )
            )}
            <Tooltip title="Toggle Dark Theme">
              <IconButton onClick={() => onDarkModeChange(!uiSchema?.appBar?.["ui:darkMode"])}>
                {uiSchema?.appBar?.["ui:darkMode"] ? (
                  <Brightness3Icon />
                ) : (
                  <WbSunnyIcon />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
