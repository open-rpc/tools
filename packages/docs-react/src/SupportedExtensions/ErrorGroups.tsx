import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { Theme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ReactJson from '@uiw/react-json-view';
import { ErrorObject, MethodObject } from '@open-rpc/tool-types';

const PREFIX = 'SupportedExtensions-ErrorGroups';

const classes = {
  code: `${PREFIX}-code`,
};

const StyledGrid = styled(Grid)(({ theme }: { theme: Theme }) => ({
  [`& .${classes.code}`]: {
    marginLeft: theme.spacing(2),
  },
  [`& .${classes.code}`]: {
    marginLeft: theme.spacing(2),
  },
  '& .MuiTableCell-root': {
    color: theme.palette.text.primary,
    borderBottomColor: theme.palette.divider,
  },
  '& .MuiTableCell-head': {
    color: `${theme.palette.text.primary} !important`,
    fontWeight: 500,
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiTable-root': {
    backgroundColor: theme.palette.background.paper,
  },
}));

interface IProps {
  errorGroups?: [ErrorObject[]];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactJsonOptions?: any;
}

export const containsErrorGroup = (object: MethodObject) => {
  if (object['x-error-group']) {
    return true;
  }
  return false;
};

export const getErrorGroups = (object: MethodObject) => {
  return object['x-error-group'];
};

class ErrorGroups extends Component<IProps> {
  public render() {
    const { errorGroups } = this.props;
    const errors = errorGroups?.flat();
    if (!errors || errors.length === 0) {
      return null;
    }
    return (
      <StyledGrid container>
        <Grid component="div" size={{ xs: 12 }}>
          <Typography variant="h5">Errors (Error Groups)</Typography>
        </Grid>
        <Grid component="div" size={{ xs: 12 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {errors.map((row) => (
                <TableRow key={row.code}>
                  <TableCell component="th" scope="row">
                    {row.code}
                  </TableCell>
                  <TableCell>{row.message}</TableCell>
                  <TableCell className={classes.code}>
                    {_.isObject(row.data) ? (
                      <ReactJson
                        value={row.data}
                        {...this.props.reactJsonOptions}
                        enableClipboard={false}
                      />
                    ) : (
                      row.data
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </StyledGrid>
    );
  }
}

export default ErrorGroups;
