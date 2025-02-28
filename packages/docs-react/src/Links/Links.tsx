import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Theme, styled } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { LinkObject } from '@open-rpc/meta-schema';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpansionTable from '../ExpansionTable/ExpansionTable';
import Servers from '../Servers/Servers';
import ReactJson from '@microlink/react-json-view';
const PREFIX = 'Links';

const classes = {
  description: `${PREFIX}-description`,
  heading: `${PREFIX}-heading`,
  paramsMargin: `${PREFIX}-paramsMargin`,
  secondaryHeading: `${PREFIX}-secondaryHeading`,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Root = styled(ExpansionTable)(({ theme }: { theme: Theme }) => ({}));

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
    if (!links || links.length === 0) {
      return null;
    }
    return (
      <Root headers={['Method', 'Summary']}>
        <TableRow>
          <TableCell colSpan={6}>
            {links.map((link: LinkObject, i: number) => (
              <div style={{ width: '100%' }} key={i}>
                <Accordion
                  style={{ width: '100%' }}
                  defaultExpanded={uiSchema && uiSchema.links['ui:defaultExpanded']}
                  key={i}
                >
                  <AccordionSummary
                    style={{ justifyContent: 'space-between' }}
                    key="links-header"
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
                    <div className="method-summary-container">
                      <Typography className={classes.heading}>{link.method}</Typography>
                      <Typography className={classes.secondaryHeading}>{link.summary}</Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: 'block' }} key="links-body">
                    {link.description && <ReactMarkdown>{link.description}</ReactMarkdown>}
                    {link.params && (
                      <Typography variant="h6" gutterBottom>
                        Params
                      </Typography>
                    )}
                    {link.params && <ReactJson src={link.params} {...reactJsonOptions} />}
                    {link.server && (
                      <Typography variant="h6" gutterBottom className={classes.paramsMargin}>
                        Server
                      </Typography>
                    )}
                    {link.server && (
                      <Servers
                        servers={[link.server]}
                        noTitle={true}
                        reactJsonOptions={reactJsonOptions}
                      />
                    )}
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
