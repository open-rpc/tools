import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import { Card, CardContent, CardHeader, Theme } from "@mui/material";
import ReactJson from "@uiw/react-json-view";
import { ExampleObject, ExamplePairingObject } from "@open-rpc/meta-schema";
import _ from "lodash";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";

const PREFIX = 'ExamplePairing';

const classes = {
  description: `${PREFIX}-description`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }: {
    theme: Theme
  }
) => ({
  [`& .${classes.description}`]: {
    color: theme.palette.text.primary,
  }
}));

export type TParamStructure = "either" | "by-name" | "by-position";

interface IProps {
  examplePairing?: ExamplePairingObject;
  paramStructure?: TParamStructure;
  methodName?: string;
  uiSchema?: any;
  reactJsonOptions?: any;
}

class ExamplePairing extends Component<IProps, Record<string, never>> {
  public render() {
    const { examplePairing, paramStructure,  methodName, uiSchema } = this.props;
    if (_.isUndefined(examplePairing)) {
      return null;
    }
    if (_.isUndefined(methodName)) {
      return null;
    }
    const params = paramStructure === "by-name"
      ? (examplePairing.params as ExampleObject[]).reduce(((memo, p) => {
        memo[p.name] = p.value;
        return memo;
      }), {} as any)
      : (examplePairing.params as ExampleObject[]).map(((p) => p.value));

    return (
      (<StyledGrid container spacing={10}>
        <Grid size={{ xs: 12 }}>
          <MarkdownDescription
            uiSchema={uiSchema}
            source={examplePairing.description}
            className={classes.description}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardHeader title="Request"></CardHeader>
            <CardContent>
              {examplePairing.params && <ReactJson value={{
                id: 1,
                jsonrpc: "2.0",
                method: methodName,
                params,
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CardHeader title="Result"></CardHeader>
          <Card>
            <CardContent>
              {examplePairing.result && <ReactJson value={{
                id: 1,
                jsonrpc: "2.0",
                result: (examplePairing.result as ExampleObject).value,
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
      </StyledGrid>)
    );
  }
}

export default (ExamplePairing);
