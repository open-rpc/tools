import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import _ from "lodash";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

const styles = (theme: Theme) => ({
  description: {
    color: theme.palette.text.primary,
    width: "100%",
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  root: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
    width: "100%",
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
});

export interface IMethodPluginProps {
  openrpcMethodObject: MethodObject;
}
export type OnMethodToggle = (method: string, expanded: boolean) => void;

interface IProps extends WithStyles<typeof styles> {
  schema?: OpenrpcDocument;
  uiSchema?: any;
  reactJsonOptions?: object;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
  disableTransitionProps?: boolean;
  onMethodToggle?: OnMethodToggle;
}

class Methods extends Component<IProps> {
  public render() {
    const { schema, classes, uiSchema, disableTransitionProps, onMethodToggle } = this.props;
    if (!schema) {
      return null;
    }
    const methods: MethodObject[] = schema.methods;
    const methodsExist = methods && methods.length > 0;
    if (!schema || !schema.methods || !methodsExist) { return null; }
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>Methods</Typography>
        {schema.methods.map((method, i) => (
          <ExpansionPanel
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
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography key={method.name} className={classes.heading}>{method.name}</Typography>
              <Typography key={method.summary} className={classes.secondaryHeading}>{method.summary}</Typography>
            </ExpansionPanelSummary>

            {method.tags && method.tags.length > 0 &&
              <ExpansionPanelDetails key="tags">
                <Tags tags={method.tags as any} />
              </ExpansionPanelDetails>
            }
            {method.description &&
              <ExpansionPanelDetails key="description">
                <MarkdownDescription
                  uiSchema={uiSchema}
                  source={method.description}
                  className={classes.description}
                />
              </ExpansionPanelDetails>
            }
            {method.params && method.params.length > 0 &&
              <ExpansionPanelDetails key="params-title">
                <Typography variant="h5">Params</Typography>
              </ExpansionPanelDetails>
            }
            {method.params &&
              <ExpansionPanelDetails key="params">
                <Params params={method.params as ContentDescriptorObject[]} uiSchema={uiSchema} />
              </ExpansionPanelDetails>
            }
            {method.result &&
              <ExpansionPanelDetails key="result-title">
                <Typography variant="h5">Result</Typography>
              </ExpansionPanelDetails>
            }
            {method.result && (method.result as ContentDescriptorObject).schema &&
              <ExpansionPanelDetails key="result">
                <ContentDescriptor
                  contentDescriptor={method.result as ContentDescriptorObject}
                  hideRequired={true} uiSchema={uiSchema} />
              </ExpansionPanelDetails>
            }
            {method.errors && method.errors.length > 0 &&
              <ExpansionPanelDetails key="errors">
                <Errors errors={method.errors as ErrorObject[]} reactJsonOptions={this.props.reactJsonOptions} />
              </ExpansionPanelDetails>
            }
            <ExamplePairings
              uiSchema={uiSchema}
              examples={method.examples as ExamplePairingObject[]}
              method={method}
              reactJsonOptions={this.props.reactJsonOptions} />
            {method.links && method.links.length > 0 &&
              <ExpansionPanelDetails key="links-title">
                <Typography variant="h5">Links</Typography>
              </ExpansionPanelDetails>
            }
            {method.links && method.links.length > 0 &&
              <ExpansionPanelDetails key="links">
                <Links links={method.links as LinkObject[]} reactJsonOptions={this.props.reactJsonOptions} />
              </ExpansionPanelDetails>
            }
            {this.props.methodPlugins && this.props.methodPlugins.length > 0 &&
              <ExpansionPanelDetails key="method-plugins">
                {this.props.methodPlugins.map((CompDef: any) => {
                  return (
                    <CompDef openrpcMethodObject={method} />
                  );
                })}
              </ExpansionPanelDetails>
            }
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Methods);
