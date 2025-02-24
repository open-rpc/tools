import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Theme, styled } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { LinkObject } from "@open-rpc/meta-schema";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpansionTable from "../ExpansionTable/ExpansionTable";
import Servers from "../Servers/Servers";
import ReactJson from "@uiw/react-json-view";

const PREFIX = 'Links';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  paramsMargin: `${PREFIX}-paramsMargin`,
  secondaryHeading: `${PREFIX}-secondaryHeading`
};

const Root = styled(ExpansionTable)(({ theme }: { theme: Theme }) => ({
  [`& .${classes.description}`]: {
    color: theme.palette.text.primary,
  },

  [`& .${classes.heading}`]: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
  },

  [`& .${classes.paramsMargin}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classes.secondaryHeading}`]: {
    alignSelf: "end",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },

  '& .MuiAccordion-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  '& .MuiAccordionSummary-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '& .MuiTypography-root': {
      color: theme.palette.text.primary,
    }
  },

  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.primary + " !important",
  },

  '& .MuiAccordionSummary-expandIconWrapper svg': {
    color: theme.palette.text.primary + " !important",
  },

  '& .MuiAccordionDetails-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  '& .MuiTableCell-root': {
    color: theme.palette.text.primary,
    borderBottomColor: theme.palette.divider,
  },

  '& p': {
    color: theme.palette.text.primary,
  },

  '& .MuiTableCell-head': {
    color: theme.palette.text.primary + " !important",
  },

  '& .method-summary-container': {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    color: theme.palette.text.primary,
  }
}));

interface IProps {
  links?: LinkObject[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSchema?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactJsonOptions?: any;
}

class Links extends Component<IProps> {
  public render() {
    const { links, uiSchema, reactJsonOptions } = this.props;
    if (!links || links.length === 0) { return null; }
    return (
      <Root headers={["Method", "Summary"]}>
        <TableRow>
          <TableCell colSpan={6}>
            {links.map((link: LinkObject, i: number) => (
              <div style={{ width: "100%" }} key={i}>
                <Accordion
                  style={{ width: "100%" }} 
                  defaultExpanded={uiSchema && uiSchema.links["ui:defaultExpanded"]} 
                  key={i}
                >
                  <AccordionSummary
                    style={{ justifyContent: "space-between" }} 
                    key="links-header" 
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div className="method-summary-container">
                      <Typography className={classes.heading}>{link.method}</Typography>
                      <Typography className={classes.secondaryHeading}>{link.summary}</Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: "block" }} key="links-body">
                    {link.description && <ReactMarkdown>{link.description}</ReactMarkdown>}
                    {link.params && <Typography variant="h6" gutterBottom>Params</Typography>}
                    {link.params && <ReactJson value={link.params} {...reactJsonOptions} />}
                    {link.server &&
                      <Typography variant="h6" gutterBottom className={classes.paramsMargin}>Server</Typography>}
                    {link.server && <Servers
                      servers={[link.server]} noTitle={true} reactJsonOptions={reactJsonOptions} />}
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </TableCell>
        </TableRow>
      </Root>
    );
  }
}

export default Links;
