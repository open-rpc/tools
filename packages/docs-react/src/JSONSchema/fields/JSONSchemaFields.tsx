import React, { Component } from "react";
import { Theme, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import { JSONSchema4 } from "json-schema";
import SchemaRenderer from "../SchemaRenderer";

const PREFIX = 'WrappedJSONSchemaFields';

const classes = {
  table: `${PREFIX}-table`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }: {
    theme: Theme
  }
) => ({
  [`& .${classes.table}`]: {
    background: theme.palette.grey[50],
  }
}));

interface IProps {
  schema?: JSONSchema4;
  name?: string;
  required?: boolean;
  hideHeader?: boolean;
}

class JSONSchemaFields extends Component<IProps> {
  public render() {
    const { schema,  name, required, hideHeader } = this.props;
    if (!schema) { return null; }
    if (_.isEmpty(schema)) { return null; }
    return (
      (<Root>
        {!hideHeader &&
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Pattern</TableCell>
                <TableCell>Required</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SchemaRenderer schema={schema} required={required} name={name} />
            </TableBody>
          </Table>
        }
        {hideHeader &&
          <SchemaRenderer schema={schema} required={required} name={name} />
        }
      </Root>)
    );
  }
}
const WrappedJSONSchemaFields = JSONSchemaFields;

export default WrappedJSONSchemaFields;
