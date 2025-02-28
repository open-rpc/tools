import React, { Component } from 'react';
import Extension from '../Extension/Extension';
import { Typography } from '@mui/material';
import { OpenrpcDocument } from '@open-rpc/meta-schema';

interface IProps {
  schema?: OpenrpcDocument;
  disableTransitionProps?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSchema?: any;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: any;
}

export default class Extensions extends Component<IProps> {
  public render() {
    const { schema, disableTransitionProps } = this.props;
    if (!schema || !schema['x-extensions']) {
      return null;
    }

    const extensions = schema['x-extensions'] as ExtensionObject[];
    if (!extensions || extensions.length === 0) {
      return null;
    }

    return (
      <>
        <Typography variant="h3" gutterBottom>
          Extensions
        </Typography>
        {extensions.map((extension: ExtensionObject, index: number) => {
          return (
            <Extension
              key={`extension-${index}-${extension.name}`}
              extension={extension}
              disableTransitionProps={disableTransitionProps}
              uiSchema={this.props.uiSchema}
              hideIcon={false}
            />
          );
        })}
      </>
    );
  }
}
