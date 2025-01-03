import React, { RefObject } from "react";
import { styled } from "@mui/material/styles";

const PREFIX = 'MonacoContainer';

const classes = {
  wrapper: `${PREFIX}-wrapper`,
  fullWidth: `${PREFIX}-fullWidth`,
  hide: `${PREFIX}-hide`
};

const Section = styled('section')({
  [`&.${classes.wrapper}`]: {
    display: "flex",
    position: "relative",
    textAlign: "initial",
  },
  [`& .${classes.fullWidth}`]: {
    width: "100%",
  },
  [`& .${classes.hide}`]: {
    display: "none",
  },
});

interface IProps {
  width?: string | number;
  height?: string | number;
  loading?: Element | string;
  isEditorReady: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reference: RefObject<any>;
}


const MonacoContainer: React.FC<IProps> = ({ width, height, reference }) => {

  return (
    (<Section className={classes.wrapper} style={{ width, height }}>
      <div
        ref={reference}
        className={classes.fullWidth}
      />
    </Section>)
  );
};

export default MonacoContainer;