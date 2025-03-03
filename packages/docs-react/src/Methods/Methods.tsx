import React from 'react';
import { Theme, styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Params from '../Params/Params';
import ContentDescriptor from '../ContentDescriptor/ContentDescriptor';
import ExamplePairings from '../ExamplePairings/ExamplePairings';
import Errors from '../Errors/Errors';
import {
  OpenrpcDocument,
  MethodObject,
  ContentDescriptorObject,
  ErrorObject,
  ExamplePairingObject,
  LinkObject,
} from '@open-rpc/meta-schema';
import Links from '../Links/Links';
import Tags from '../Tags/Tags';
import MarkdownDescription from '../MarkdownDescription/MarkdownDescription';
import Box from '@mui/material/Box';
import { getErrorGroups } from '../SupportedExtensions/ErrorGroups';
import { mergeErrors } from '../SupportedExtensions/errorGroupUtil';

const PREFIX = 'Methods';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  root: `${PREFIX}-root`,
  secondaryHeading: `${PREFIX}-secondaryHeading`,
};

const MethodsContainer = styled(Box)(({ theme }: { theme: Theme }) => {
  return {
    [`& .${classes.description}`]: {
      color: theme.palette.text.primary,
      width: '100%',
    },
    [`& .${classes.heading}`]: {
      flexBasis: '33.33%',
      flexShrink: 0,
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.primary,
    },
    [`&.${classes.root}`]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(3),
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
    [`& .${classes.secondaryHeading}`]: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(15),
    },
    '& .MuiAccordion-Heading': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    '& .MuiAccordion-root': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderColor: `${theme.palette.divider} !important`,
      position: 'relative',
      '&::before': {
        backgroundColor: `${theme.palette.divider} !important`,
      },
    },
    '& .MuiAccordionSummary-root': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    '& .MuiAccordionDetails-root': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    '& .MuiTypography-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& .MuiAccordionSummary-expandIconWrapper svg': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& .MuiSvgIcon-root': {
      color: `${theme.palette.text.primary} !important`,
    },
  };
});

export interface IMethodPluginProps {
  openrpcMethodObject: MethodObject;
}
export type OnMethodToggle = (method: string, expanded: boolean) => void;

interface IProps {
  schema?: OpenrpcDocument;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSchema?: any;
  reactJsonOptions?: object;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
  disableTransitionProps?: boolean;
  onMethodToggle?: OnMethodToggle;
}

const Methods: React.FC<IProps> = ({
  schema,
  uiSchema,
  reactJsonOptions,
  methodPlugins,
  disableTransitionProps,
  onMethodToggle,
}) => {
  if (!schema) {
    return null;
  }
  if (!schema || !schema.methods) {
    return null;
  }
  const methods = schema.methods as MethodObject[];
  const methodsExist = methods && methods.length > 0;
  if (!methodsExist) {
    return null;
  }

  return (
    <MethodsContainer className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Methods
      </Typography>
      {methods.map((method, i) => {
        const errors = mergeErrors(method.errors as ErrorObject[], getErrorGroups(method));
        return (
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
              (uiSchema.methods['ui:defaultExpanded'] === true ||
                (uiSchema.methods['ui:defaultExpanded'] &&
                  uiSchema.methods['ui:defaultExpanded'][method.name] === true))
            }
          >
            <AccordionSummary
              expandIcon={<ChevronRightIcon />}
              sx={{
                '& .MuiAccordionSummary-expandIconWrapper': {
                  order: -1,
                  marginRight: 1,
                  marginLeft: 0,
                },
                [`& .MuiAccordionSummary-expandIconWrapper.Mui-expanded`]: {
                  transform: 'rotate(90deg)',
                },
              }}
            >
              <Typography className={classes.heading}>{method.name}</Typography>
              <Typography className={classes.secondaryHeading}>{method.summary}</Typography>
            </AccordionSummary>
            {method.tags && method.tags.length > 0 && (
              <AccordionDetails key="tags">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Tags tags={method.tags as any} />
              </AccordionDetails>
            )}
            {method.description && (
              <AccordionDetails key="description">
                <MarkdownDescription
                  uiSchema={uiSchema}
                  source={method.description}
                  className={classes.description}
                />
              </AccordionDetails>
            )}

            {method.params && method.params.length > 0 && (
              <AccordionDetails key="params-title">
                <Typography variant="h5">Params</Typography>
              </AccordionDetails>
            )}
            {method.params && (
              <AccordionDetails key="params">
                <Params params={method.params as ContentDescriptorObject[]} uiSchema={uiSchema} />
              </AccordionDetails>
            )}
            {method.result && (
              <AccordionDetails key="result-title">
                <Typography variant="h5">Result</Typography>
              </AccordionDetails>
            )}
            {method.result && (method.result as ContentDescriptorObject).schema && (
              <AccordionDetails key="result">
                <ContentDescriptor
                  contentDescriptor={method.result as ContentDescriptorObject}
                  hideRequired={true}
                  uiSchema={uiSchema}
                />
              </AccordionDetails>
            )}

            {errors && errors.length > 0 && (
              <AccordionDetails key="errors">
                <Errors errors={errors} reactJsonOptions={reactJsonOptions} />
              </AccordionDetails>
            )}
            <ExamplePairings
              key="example-pairings"
              uiSchema={uiSchema}
              examples={method.examples as ExamplePairingObject[]}
              method={method}
              reactJsonOptions={reactJsonOptions}
            />
            {method.links && method.links.length > 0 && (
              <AccordionDetails key="links-title">
                <Typography variant="h5">Links</Typography>
              </AccordionDetails>
            )}
            {method.links && method.links.length > 0 && (
              <AccordionDetails key="links">
                <Links links={method.links as LinkObject[]} reactJsonOptions={reactJsonOptions} />
              </AccordionDetails>
            )}
            {methodPlugins && methodPlugins.length > 0 && (
              <AccordionDetails key="method-plugins">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {methodPlugins.map((CompDef: any, index: number) => {
                  return <CompDef key={`method-plugin-${index}`} openrpcMethodObject={method} />;
                })}
              </AccordionDetails>
            )}
          </Accordion>
        );
      })}
    </MethodsContainer>
  );
};

export default Methods;
