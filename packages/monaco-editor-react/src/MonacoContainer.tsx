import React, { RefObject } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  width?: string | number;
  height?: string | number;
  loading?: Element | string;
  isEditorReady: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reference: RefObject<any>;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    position: "relative",
    textAlign: "initial",
  },
  fullWidth: {
    width: "100%",
  },
  hide: {
    display: "none",
  },
});

const MonacoContainer: React.FC<IProps> = ({ width, height, reference }) => {
  const classes = useStyles({});
  return (
    <section className={classes.wrapper} style={{ width, height }}>
      <div
        ref={reference}
        className={classes.fullWidth}
      />
    </section>
  );
};

export default MonacoContainer;