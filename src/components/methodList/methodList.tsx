import React, { useState } from "react";
import MethodListItem from "../methodListItem/methodListItem";
import { IJSONRPCLog } from "../logsReact/logsReact";
import { Modal, FormControl, FormGroup, Checkbox, FormControlLabel, Paper } from "@material-ui/core";

import "./methodList.css";

interface IProps {
  logs: IJSONRPCLog[];
  active: string[];
  select: any;
}

// returns if array is in an array of arrays
const searchForArray = (haystack: string[][], needle: string[]) => {
  for (const element of haystack) {
    if (needle.length === element.length && needle.every(v => element.includes(v))) {
      return true;
    }
  }
  return false;
};

// Returns array of method names
const getMethods = (logs: IJSONRPCLog[]) => {
  const methods: string[][] = [["all"]];
  for (const log of logs) {
    if (!searchForArray(methods, [log.method])) {
      methods.push([log.method]);
    }
  }
  return methods;
};

//TODO button to hide
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
  const [open, setOpen] = useState(false);
  const allMethods: string[][] = [...methods, ...filters];

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
    setOpen(false);
    setCreateFilter([]);
    if (!searchForArray(filters, createFilter)) {
      return setFilters([...filters, createFilter]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCreateFilter([]);
  };

  return (
    <div className="method-list">
      {allMethods.map((filter) => (
        <MethodListItem
          key={filter.join(" ")}
          filter={filter}
          active={searchForArray([filter], props.active)}
          select={props.select}
        />
      ))}
      <button type="button" onClick={handleOpen}>add new filter</button>
      <Modal
        open={open}
        onClose={handleClose}
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
            <button onClick={handleSubmit}>Submit</button>
          </FormControl>
        </Paper>
      </Modal>
    </div>
  );
};

export default MethodList;
