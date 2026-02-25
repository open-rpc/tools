import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { JSONSchemaTree } from '@open-rpc/json-schema-to-react-tree';
import { ContentDescriptorObject } from '@open-rpc/tool-types';
import { JSONSchema7 } from 'json-schema';
import './ContentDescriptor.css';
import MarkdownDescription from '../MarkdownDescription/MarkdownDescription';

const PREFIX = 'ContentDescriptor';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  secondaryHeading: `${PREFIX}-secondaryHeading`,
};

// Base styled component without theme-specific styling
const StyledAccordion = styled(Accordion)({});

interface UISchema {
  params: {
    'ui:defaultExpanded'?: boolean;
  };
}

interface IProps {
  contentDescriptor?: ContentDescriptorObject;
  hideIcon?: boolean;
  hideRequired?: boolean;
  disableTransitionProps?: boolean;
  uiSchema?: UISchema;
}

const ContentDescriptor: React.FC<IProps> = ({
  contentDescriptor,
  hideIcon,
  hideRequired,
  uiSchema,
  disableTransitionProps,
}) => {
  const theme = useTheme();

  if (!contentDescriptor) {
    return null;
  }

  const entries = Object.entries(contentDescriptor);
  if (entries.length === 0) {
    return null;
  }

  return (
    <StyledAccordion
      style={{ width: '100%' }}
      TransitionProps={{ unmountOnExit: disableTransitionProps ? false : true }}
      defaultExpanded={uiSchema && uiSchema.params['ui:defaultExpanded']}
      expanded={contentDescriptor.name ? undefined : true}
      sx={{
        [`& .${classes.description}`]: {
          color: theme.palette.text.primary,
        },
        [`& .${classes.heading}`]: {
          flexBasis: '33.33%',
          flexShrink: 0,
          fontSize: theme.typography.pxToRem(15),
          color: theme.palette.text.primary,
        },
        [`& .${classes.secondaryHeading}`]: {
          alignSelf: 'end',
          color: theme.palette.text.secondary,
          fontSize: theme.typography.pxToRem(15),
        },
        '& .MuiAccordionSummary-root': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
          color: `${theme.palette.text.primary} !important`,
        },
        '& .MuiAccordionSummary-expandIconWrapper svg': {
          color: `${theme.palette.text.primary} !important`,
        },
        '& .MuiAccordionDetails-root': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
        '& .MuiTypography-root': {
          color: theme.palette.text.primary,
        },
        '& .MuiTypography-colorPrimary': {
          color: theme.palette.primary.main,
        },
      }}
    >
      <AccordionSummary
        style={{ justifyContent: 'space-between' }}
        expandIcon={!contentDescriptor.name || hideIcon ? null : <ChevronRightIcon />}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Typography className={classes.heading}>{contentDescriptor.name}</Typography>
          <Typography className={classes.secondaryHeading}>{contentDescriptor.summary}</Typography>
          {hideRequired ? null : (
            <Typography className={classes.secondaryHeading}>
              {contentDescriptor.required ? 'true' : 'false'}
            </Typography>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block', overflowX: 'auto' }}>
        <>
          {contentDescriptor.description && (
            <MarkdownDescription
              uiSchema={uiSchema}
              source={contentDescriptor.description}
              className={classes.description}
            />
          )}
          {contentDescriptor.schema && (
            <>
              <Typography variant="body1" color="primary">
                schema
              </Typography>
              <JSONSchemaTree schema={contentDescriptor.schema as JSONSchema7} />
            </>
          )}
        </>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ContentDescriptor;
