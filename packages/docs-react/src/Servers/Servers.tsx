import React, { Component } from "react";
import {Theme, styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
import { ServerObject } from "@open-rpc/meta-schema";
import ReactJson from "@uiw/react-json-view";
import ExpansionTable from "../ExpansionTable/ExpansionTable";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";

const PREFIX = 'Servers';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  paramsMargin: `${PREFIX}-paramsMargin`,
  secondaryHeading: `${PREFIX}-secondaryHeading`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }: {
    theme: Theme
  }
) => { 
  console.log("Theme in Servers styled callback:", {
    mode: theme.palette.mode,
    text: {
      primary: theme.palette.text.primary,
      secondary: theme.palette.text.secondary
    }
  });
  return {
  [`& .${classes.description}`]: {
    color: theme.palette.text.primary,
  },

  [`& .${classes.heading}`]: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },

  [`& .${classes.paramsMargin}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classes.secondaryHeading}`]: {
    alignSelf: "end",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  }
  };
});

interface IProps {
  servers?: ServerObject[];
  uiSchema?: any;
  reactJsonOptions?: any;
  noTitle?: boolean;
}

class Servers extends Component<IProps> {
  public render() {
    const { servers, noTitle, reactJsonOptions, uiSchema, } = this.props;
    if (!servers || servers.length === 0) {
      return null;
    }
    return (
      (<Root>
        {noTitle ? null : <Typography variant="h2">Servers</Typography>}
        <ExpansionTable headers={["Name", "Url", "Summary"]}>
          <TableRow>
            <TableCell colSpan={6}>
              {servers.map((server, i) => (
                <div style={{ width: "100%" }} key={i}>
                  <Accordion
                    style={{ width: "100%" }}
                    defaultExpanded={uiSchema && uiSchema.servers["ui:defaultExpanded"]} key={i}>
                    <AccordionSummary
                      style={{ justifyContent: "space-between" }} key="servers-header" expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{server.name}</Typography>
                      <Typography className={classes.secondaryHeading}>{server.url}</Typography>
                      <Typography className={classes.secondaryHeading}>{server.summary}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: "block" }} key="servers-body">
                      {server.description &&
                        <MarkdownDescription
                          uiSchema={uiSchema}
                          source={server.description}
                          className={classes.description}
                        />
                      }
                      {server.variables &&
                        <Typography variant="h6" gutterBottom className={classes.paramsMargin}>Variables</Typography>}
                      {server.variables && <ReactJson value={server.variables} {...reactJsonOptions} />}
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </TableCell>
          </TableRow>
        </ExpansionTable>
      </Root>)
    );
  }
}

export default (Servers);
