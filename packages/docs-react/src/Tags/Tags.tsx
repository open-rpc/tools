import React, { Component } from 'react';
import { TagObject } from '@open-rpc/meta-schema';
import { Chip } from '@mui/material';
import * as hashColor from '../util/hashColor';

interface IProps {
  tags?: TagObject[];
}

export default class Tags extends Component<IProps> {
  public render() {
    const { tags }: { tags?: TagObject[] } = this.props;
    if (!tags || tags.length === 0) {
      return null;
    }
    return (
      <>
        {tags.map((tag) => {
          return (
            <Chip
              key={tag.name}
              label={tag.name}
              style={{ backgroundColor: hashColor.getColorFromString(tag.name) }}
            />
          );
        })}
      </>
    );
  }
}
