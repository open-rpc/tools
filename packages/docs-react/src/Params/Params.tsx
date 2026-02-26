import React, { Component } from 'react';
import { Theme, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ContentDescriptor from '../ContentDescriptor/ContentDescriptor';
import { ContentDescriptorObject } from '@open-rpc/tool-types';

const PREFIX = 'Params';

const classes = {
  schema: `${PREFIX}-schema`,
  table: `${PREFIX}-table`,
  tableEnd: `${PREFIX}-tableEnd`,
  tableStart: `${PREFIX}-tableStart`,
};

const StyledTable = styled(Table)(({ theme }: { theme: Theme }) => ({
  [`& .${classes.schema}`]: {
    marginLeft: theme.spacing(8),
  },

  [`&.${classes.table}`]: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  [`& .${classes.tableEnd}`]: {
    paddingLeft: theme.spacing(3),
    color: theme.palette.text.primary,
  },

  [`& .${classes.tableStart}`]: {
    paddingLeft: theme.spacing(3),
    color: theme.palette.text.primary,
  },

  // Add theme colors to all table components
  '& .MuiTableCell-root': {
    color: theme.palette.text.primary,
    borderBottomColor: `${theme.palette.divider} !important`,
  },

  '& .MuiTableHead-root': {
    '& .MuiTableCell-root': {
      color: `${theme.palette.text.primary} !important`,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },

  '& .MuiTableBody-root': {
    '& .MuiTableCell-root': {
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));

// TODO: this extended with styles before
interface IProps {
  params?: ContentDescriptorObject[];
  disableTransitionProps?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSchema?: any;
}

class Params extends Component<IProps> {
  public render() {
    const { params, uiSchema } = this.props;
    if (!params || params.length === 0) {
      return null;
    }
    return (
      <StyledTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell key={1} className={classes.tableStart}>
              Parameter Name
            </TableCell>
            <TableCell key={2} align="right">
              Summary
            </TableCell>
            <TableCell key={3} align="right" className={classes.tableEnd}>
              Required
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6}>
              {params.map((row) => (
                <ContentDescriptor
                  key={row.name}
                  contentDescriptor={row}
                  uiSchema={uiSchema}
                  disableTransitionProps={this.props.disableTransitionProps}
                />
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    );
  }
}

export default Params;
