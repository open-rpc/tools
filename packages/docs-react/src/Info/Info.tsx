import React, { Component } from 'react';
import { Typography, Chip, Button } from '@mui/material';
import { Theme, styled } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { OpenrpcDocument } from '@open-rpc/tool-types';

const PREFIX = 'Info';

const classes = {
  button: `${PREFIX}-button`,
  chip: `${PREFIX}-chip`,
  description: `${PREFIX}-description`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }: { theme: Theme }) => ({
  [`& .${classes.button}`]: {
    margin: theme.spacing(2),
  },

  [`& .${classes.chip}`]: {
    margin: theme.spacing(2),
  },

  [`& .${classes.description}`]: {
    color: theme.palette.text.primary,
    padding: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px 0`,
  },
}));

interface IProps {
  schema?: OpenrpcDocument;
}

class Info extends Component<IProps> {
  public render() {
    const { schema } = this.props;
    if (!schema || !schema.info) {
      return null;
    }
    const info = schema.info;

    return (
      <Root>
        {info.title && (
          <Typography variant="h2" gutterBottom>
            {info.title}
          </Typography>
        )}
        {info.version && <Chip label={info.version} />}
        {info.license && info.license.name && info.license.url && (
          <Chip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            component={'a' as any}
            {...{ href: info.license.url }}
            className={classes.chip}
            clickable
            color="primary"
            label={info.license.name}
          />
        )}
        {info.description && (
          <ReactMarkdown className={classes.description}>{info.description}</ReactMarkdown>
        )}
        {info.termsOfService && (
          <Button className={classes.button} variant="contained" href={info.termsOfService}>
            Terms Of Service
          </Button>
        )}
        {info.contact && info.contact.url && info.contact.name && (
          <Button className={classes.button} variant="contained" href={info.contact.url}>
            Contact {info.contact.name}
          </Button>
        )}
        {info.contact && info.contact.email && (
          <Button
            className={classes.button}
            variant="contained"
            href={`mailto:${info.contact.email}`}
          >
            Email {info.contact.name}
          </Button>
        )}
      </Root>
    );
  }
}

export default Info;
