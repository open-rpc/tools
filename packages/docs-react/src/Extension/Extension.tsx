import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Box, Chip, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LockIcon from '@mui/icons-material/Lock';
import { JSONSchemaTree } from '@open-rpc/json-schema-to-react-tree';
import { JSONSchema7 } from 'json-schema';
import MarkdownDescription from '../MarkdownDescription/MarkdownDescription';
import './Extension.css';

const PREFIX = 'Extension';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  secondaryHeading: `${PREFIX}-secondaryHeading`,
  restrictedChips: `${PREFIX}-restrictedChips`,
  externalDocButton: `${PREFIX}-externalDocButton`,
  sectionTitle: `${PREFIX}-sectionTitle`,
  sectionContent: `${PREFIX}-sectionContent`,
};

// Base styled component without theme-specific styling
const StyledAccordion = styled(Accordion)({});

// Styled components for enhanced visuals
const RestrictedChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

interface UISchema {
  extensions: {
    'ui:defaultExpanded'?: boolean;
  };
}

interface ExtensionObject {
  openrpcExtension?: string;
  name: string;
  version?: string;
  description?: string;
  summary?: string;
  externalDocumentation?: {
    description?: string;
    url: string;
  };
  restricted?: string[];
  schema?: JSONSchema7;
}

interface IProps {
  extension?: ExtensionObject;
  hideIcon?: boolean;
  disableTransitionProps?: boolean;
  uiSchema?: UISchema;
}

const Extension: React.FC<IProps> = ({ extension, hideIcon, uiSchema, disableTransitionProps }) => {
  const theme = useTheme();

  if (!extension) {
    return null;
  }

  // Check if extension is a valid object with properties
  if (typeof extension !== 'object' || extension === null) {
    return null;
  }

  // Ensure extension.name exists before trying to use it
  const extensionName = extension.name || '';

  return (
    <StyledAccordion
      style={{ width: '100%' }}
      TransitionProps={{ unmountOnExit: disableTransitionProps ? false : true }}
      defaultExpanded={uiSchema && uiSchema.extensions && uiSchema.extensions['ui:defaultExpanded']}
      expanded={extensionName ? undefined : true}
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
        [`& .${classes.sectionTitle}`]: {
          color: theme.palette.primary.main,
          marginBottom: theme.spacing(1),
          fontWeight: 500,
        },
        [`& .${classes.sectionContent}`]: {
          marginBottom: theme.spacing(2),
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
          padding: theme.spacing(2, 3, 3),
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
        expandIcon={!extensionName || hideIcon ? null : <ChevronRightIcon />}
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
          <Typography className={classes.heading}>{extensionName}</Typography>
          <Typography className={classes.secondaryHeading}>{extension.summary}</Typography>
          {extension.version && (
            <Typography className={classes.secondaryHeading}>v{extension.version}</Typography>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block', overflowX: 'auto' }}>
        <>
          {extension.description && (
            <SectionContainer>
              <MarkdownDescription
                uiSchema={uiSchema}
                source={extension.description}
                className={classes.description}
              />
            </SectionContainer>
          )}

          {extension.restricted && extension.restricted.length > 0 && (
            <SectionContainer>
              <Typography variant="body1" color="primary" className={classes.sectionTitle}>
                Restricted to
              </Typography>
              <RestrictedChipsContainer>
                {extension.restricted.map((restriction, index) => (
                  <Chip
                    key={`${restriction}-${index}`}
                    label={restriction}
                    size="small"
                    icon={<LockIcon />}
                    color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: '4px',
                      '& .MuiChip-icon': {
                        color: 'inherit',
                      },
                    }}
                  />
                ))}
              </RestrictedChipsContainer>
            </SectionContainer>
          )}

          {extension.externalDocumentation && (
            <SectionContainer>
              <Typography variant="body1" color="primary" className={classes.sectionTitle}>
                External Documentation
              </Typography>
              <Box className={classes.sectionContent}>
                {extension.externalDocumentation.description && (
                  <Typography variant="body2" gutterBottom>
                    {extension.externalDocumentation.description}
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  href={extension.externalDocumentation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 1 }}
                >
                  View Documentation
                </Button>
              </Box>
            </SectionContainer>
          )}

          {extension.schema && (
            <SectionContainer>
              <Typography variant="body1" color="primary" className={classes.sectionTitle}>
                Schema
              </Typography>
              <JSONSchemaTree schema={extension.schema as JSONSchema7} />
            </SectionContainer>
          )}
        </>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Extension;
