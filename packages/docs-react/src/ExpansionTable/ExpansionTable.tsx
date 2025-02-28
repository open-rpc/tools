import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

const PREFIX = 'ExpansionTable';

const classes = {
  heading: `${PREFIX}-heading`,
  root: `${PREFIX}-root`,
  secondaryHeading: `${PREFIX}-secondaryHeading`,
};

const StyledTable = styled(Table)(({ theme }: { theme: Theme }) => ({
  [`& .${classes.heading}`]: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },

  [`& .${classes.root}`]: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(6),
    width: '100%',
  },

  [`& .${classes.secondaryHeading}`]: {
    alignSelf: 'end',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },

  '& .MuiTableCell-root': {
    color: theme.palette.text.primary,
    borderBottomColor: theme.palette.divider,
  },
  '& .MuiTableCell-head': {
    color: `${theme.palette.text.primary} !important`,
    fontWeight: 500,
  },
  '& .MuiTableCell-alignRight': {
    color: `${theme.palette.text.primary} !important`,
  },
}));

interface IProps {
  headers?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

class ExpansionTable extends Component<IProps> {
  public render() {
    const { headers, children } = this.props;
    if (!headers || headers.length === 0) {
      return null;
    }
    return (
      <StyledTable>
        <TableHead>
          <TableRow>
            {headers.map((header, i) => {
              return (
                <TableCell key={i} align={i === 0 ? undefined : 'right'}>
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </StyledTable>
    );
  }
}

export default ExpansionTable;
