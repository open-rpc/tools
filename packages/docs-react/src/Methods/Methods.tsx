import React, { Component } from "react";
import { Theme, styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import _ from "lodash";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Params from "../Params/Params";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import ExamplePairings from "../ExamplePairings/ExamplePairings";
import Errors from "../Errors/Errors";
import {
  OpenrpcDocument,
  MethodObject,
  ContentDescriptorObject,
  ErrorObject,
  ExamplePairingObject,
  LinkObject,
} from "@open-rpc/meta-schema";
import Links from "../Links/Links";
import Tags from "../Tags/Tags";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";

const PREFIX = 'Methods';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  root: `${PREFIX}-root`,
  secondaryHeading: `${PREFIX}-secondaryHeading`
};

const Root = styled('div')((
  {
    theme
  }: {
    theme: Theme
  }
) => ({
  [`& .${classes.description}`]: {
    color: theme.palette.text.primary,
    width: "100%",
  },

  [`& .${classes.heading}`]: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },

  [`&.${classes.root}`]: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
    width: "100%",
  },

  [`& .${classes.secondaryHeading}`]: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  }
}));

export interface IMethodPluginProps {
  openrpcMethodObject: MethodObject;
}
export type OnMethodToggle = (method: string, expanded: boolean) => void;

interface IProps {
  schema?: OpenrpcDocument;
  uiSchema?: any;
  reactJsonOptions?: object;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
  disableTransitionProps?: boolean;
  onMethodToggle?: OnMethodToggle;
}

class Methods extends Component<IProps> {
  public render() {
    const { schema,  uiSchema, disableTransitionProps, onMethodToggle } = this.props;
    if (!schema) {
      return null;
    }
    if (!schema || !schema.methods) {
      return null;
    }
    const methods = schema.methods as MethodObject[];
    const methodsExist = methods && methods.length > 0;
    if (!methodsExist) { return null; }
    return (
      (<Root className={classes.root}>
        <Typography variant="h3" gutterBottom>Methods</Typography>
        {methods.map((method, i) => (
          <Accordion
            id={method.name}
            key={i + method.name}
            TransitionProps={{ unmountOnExit: disableTransitionProps ? false : true }}
            onChange={(__, expanded: boolean) => {
              if (onMethodToggle) {
                onMethodToggle(method.name, expanded);
              }
            }}
            defaultExpanded={
              uiSchema &&
              uiSchema.methods &&
              (uiSchema.methods["ui:defaultExpanded"] === true ||
                (uiSchema.methods["ui:defaultExpanded"] && uiSchema.methods["ui:defaultExpanded"][method.name] === true)
              )
            }>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{method.name}</Typography>
              <Typography className={classes.secondaryHeading}>{method.summary}</Typography>
            </AccordionSummary>

            {method.tags && method.tags.length > 0 &&
              <AccordionDetails key="tags">
                <Tags tags={method.tags as any} />
              </AccordionDetails>
            }
            {method.description &&
              <AccordionDetails key="description">
                <MarkdownDescription
                  uiSchema={uiSchema}
                  source={method.description}
                  className={classes.description}
                />
              </AccordionDetails>
            }
            {method.params && method.params.length > 0 &&
              <AccordionDetails key="params-title">
                <Typography variant="h5">Params</Typography>
              </AccordionDetails>
            }
            {method.params &&
              <AccordionDetails key="params">
                <Params params={method.params as ContentDescriptorObject[]} uiSchema={uiSchema} />
              </AccordionDetails>
            }
            {method.result &&
              <AccordionDetails key="result-title">
                <Typography variant="h5">Result</Typography>
              </AccordionDetails>
            }
            {method.result && (method.result as ContentDescriptorObject).schema &&
              <AccordionDetails key="result">
                <ContentDescriptor
                  contentDescriptor={method.result as ContentDescriptorObject}
                  hideRequired={true} uiSchema={uiSchema} />
              </AccordionDetails>
            }
            {method.errors && method.errors.length > 0 &&
              <AccordionDetails key="errors">
                <Errors errors={method.errors as ErrorObject[]} reactJsonOptions={this.props.reactJsonOptions} />
              </AccordionDetails>
            }
            <ExamplePairings
              key="example-pairings"
              uiSchema={uiSchema}
              examples={method.examples as ExamplePairingObject[]}
              method={method}
              reactJsonOptions={this.props.reactJsonOptions} />
            {method.links && method.links.length > 0 &&
              <AccordionDetails key="links-title">
                <Typography variant="h5">Links</Typography>
              </AccordionDetails>
            }
            {method.links && method.links.length > 0 &&
              <AccordionDetails key="links">
                <Links links={method.links as LinkObject[]} reactJsonOptions={this.props.reactJsonOptions} />
              </AccordionDetails>
            }
            {this.props.methodPlugins && this.props.methodPlugins.length > 0 &&
              <AccordionDetails key="method-plugins">
                {this.props.methodPlugins.map((CompDef: any, index: number) => {
                  return (
                    <CompDef key={`method-plugin-${index}`} openrpcMethodObject={method} />
                  );
                })}
              </AccordionDetails>
            }
          </Accordion>
        ))}
      </Root>)
    );
  }
}

export default (Methods);
