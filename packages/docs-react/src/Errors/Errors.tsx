import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import _ from 'lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ReactJson from '@microlink/react-json-view';
import { ErrorObject } from '@open-rpc/meta-schema';

const PREFIX = 'Errors';

const classes = {
  code: `${PREFIX}-code`,
};

// Base styled component without theme-specific styling
const StyledGrid = styled(Grid)({});

interface IProps {
  errors?: ErrorObject[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactJsonOptions?: any;
}

const Errors: React.FC<IProps> = ({ errors, reactJsonOptions }) => {
  const theme = useTheme();

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <StyledGrid
      container
      sx={{
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
      }}
    >
      <Grid component="div" size={{ xs: 12 }}>
        <Typography variant="h5">Errors</Typography>
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
                    <ReactJson src={row.data} {...reactJsonOptions} enableClipboard={false} />
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
};

export default Errors;
