import React, { useState } from "react";
import { useTheme } from '@material-ui/core/styles';
import { IJSONRPCLog } from "../logsReact/logsReact";
import {
  Modal,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import "./methodList.css";

interface IProps {
  logs: IJSONRPCLog[];
  active: string[];
  select: any;
  isDrawerOpen: boolean;
  closeDrawer: any;
}

// returns if array is in an array of arrays
const searchForArray = (haystack: string[][], needle: string[]) => {
  for (const element of haystack) {
    if (needle.length === element.length && needle.every((v) => element.includes(v))) {
      return true;
    }
  }
  return false;
};

// Returns array of method names
const getMethods = (logs: IJSONRPCLog[]) => {
  const methods: string[][] = [];
  for (const log of logs) {
    if (!searchForArray(methods, [log.method])) {
      methods.push([log.method]);
    }
  }
  return methods;
};

const MethodList: React.FC<IProps> = (props) => {

  /*
	string[][] filters: stores all custom filters created in Modal
	string[] createFilter: stores current custom filter progress before submit
	string[][] methods: stores all methods that have been called
	boolean open: stores boolean value if modal is open or closed
	string[][] allMethods: stores all methods and custom filters
	*/
  const [filters, setFilters] = useState<string[][]>([]);
  const [createFilter, setCreateFilter] = useState<string[]>([]);
  const methods = getMethods(props.logs);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();

  const allMethods: string[][] = [["all"], ...methods, ...filters];

  const handleChecked = (event, x) => {
    if (x) {
      return setCreateFilter((prevCreateFilter) => [...prevCreateFilter, event.target.value]);
    } else {
      const array = [...createFilter];
      const index = array.indexOf(event.target.value);
      if (index > -1) {
        array.splice(index, 1);
        return setCreateFilter([...array]);
      }
    }
  };

  const handleSubmit = (event) => {
    setModalOpen(false);
    setCreateFilter([]);
    if (!searchForArray(filters, createFilter)) {
      return setFilters([...filters, createFilter]);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCreateFilter([]);
  };

  return (
    <div className="root">
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={props.isDrawerOpen}
        classes={{
          paper: "drawerPaper"
        }}
      >
          <div className="drawerHeader">
              <IconButton onClick={props.closeDrawer}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
          </div>
          <Divider/>
          <List>
            {allMethods.map((filter) => (
              <ListItem button key={filter.join(" ")} onClick={() => props.select(filter)}>
                <ListItemText>
                  {filter.join(", ")}
                </ListItemText>
              </ListItem>
            ))}
            <ListItem button onClick={handleModalOpen} disabled={methods.length > 2 ? false : true}>
              <ListItemIcon>{<AddCircleOutlineIcon />}</ListItemIcon>
              <ListItemText>
                add new filter
              </ListItemText>
            </ListItem>
          </List>
      </Drawer>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-label"
      >
        <Paper className="modal">
          <FormControl>
            <h2 id="modal-label">Select methods you wish to filter by</h2>
            <FormGroup>
              {methods.map((method) => (
                <FormControlLabel
                  control={<Checkbox value={method} key={method.toString()} onChange={handleChecked}
                    checked={createFilter.includes(method[0])} />}
                  label={method.join(" ")}
                />
              ))}
            </FormGroup>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </FormControl>
        </Paper>
      </Modal>
    </div>
  );
};

export default MethodList;
