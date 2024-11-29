import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import hashToColor from "hash-color-material";

interface IProps {
  tags?: string[];
  classes: any;
}

const styles = (theme: Theme) => ({
  chip: {
    margin: theme.spacing(1),
  },
});

const Tags: React.FC<IProps> = ({ tags, classes }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          className={classes.chip}
          style={{ backgroundColor: hashToColor(tag) }}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(Tags);
