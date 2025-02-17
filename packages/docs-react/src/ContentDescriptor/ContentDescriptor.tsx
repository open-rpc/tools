import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import { Typography, Theme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { JSONSchemaTree } from  "@open-rpc/json-schema-to-react-tree";
import { ContentDescriptorObject } from "@open-rpc/meta-schema";
import { JSONSchema7 } from "json-schema";
import "./ContentDescriptor.css";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";

const PREFIX = 'ContentDescriptor';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  secondaryHeading: `${PREFIX}-secondaryHeading`
};

const StyledAccordion = styled(Accordion)((
  {
    theme
  }: {
    theme: Theme
  }
) => ({
  [`& .${classes.description}`]: {
    color: theme.palette.text.primary,
  },

  [`& .${classes.heading}`]: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },

  [`& .${classes.secondaryHeading}`]: {
    alignSelf: "end",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  }
}));

interface UISchema {
  params: {
    "ui:defaultExpanded"?: boolean;
  };
}

//TODO: this extended with styles before
interface IProps{
  contentDescriptor?: ContentDescriptorObject;
  hideIcon?: boolean;
  hideRequired?: boolean;
  disableTransitionProps?: boolean;
  uiSchema?: UISchema;
}

class ContentDescriptor extends Component<IProps> {
  public render() {
    const { contentDescriptor,  hideIcon, hideRequired, uiSchema, disableTransitionProps } = this.props;
    if (!contentDescriptor) { return null; }
    const entries = Object.entries(contentDescriptor);
    if (entries.length === 0) { return null; }
    return (
      (<StyledAccordion
        style={{ width: "100%" }}
        TransitionProps={{unmountOnExit: disableTransitionProps ? false : true}}
        defaultExpanded={uiSchema && uiSchema.params["ui:defaultExpanded"]}
        expanded={contentDescriptor.name ? undefined : true}>
        <AccordionSummary
          expandIcon={(!contentDescriptor.name || hideIcon) ? null : <ExpandMoreIcon />}
          style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%", alignItems: "center" }}>
            <Typography className={classes.heading}>{contentDescriptor.name}</Typography>
            <Typography className={classes.secondaryHeading}>{contentDescriptor.summary}</Typography>
            {hideRequired ? null : <Typography className={classes.secondaryHeading}>
              {contentDescriptor.required ? "true" : "false"}
            </Typography>}
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ display: "block", overflowX: "auto" }}>
          <>
            {contentDescriptor.description &&
              <MarkdownDescription
                uiSchema={uiSchema}
                source={contentDescriptor.description}
                className={classes.description}
                />
            }
            {contentDescriptor.schema &&
              <>
                <Typography variant="body1" color="primary">schema</Typography>
                <JSONSchemaTree schema={contentDescriptor.schema as JSONSchema7} />
              </>
            }
          </>
        </AccordionDetails>
      </StyledAccordion>)
    );
  }
}
export default (ContentDescriptor);
