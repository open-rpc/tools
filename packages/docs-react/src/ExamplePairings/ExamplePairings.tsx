import React, { Component } from 'react';
import ExamplePairing from '../ExamplePairing/ExamplePairing';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  AccordionDetails,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  MethodObject,
  ExamplePairingObject,
  ContentDescriptorObject,
  JSONSchemaObject,
} from '@open-rpc/tool-types';

interface IProps {
  method?: MethodObject;
  examples?: ExamplePairingObject[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSchema?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactJsonOptions?: any;
}

interface IState {
  anchorEl: Element | null;
  selectedIndex: number;
  currentExample?: ExamplePairingObject;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isJSONSchemaObject = (schema: any): schema is JSONSchemaObject => {
  return schema && typeof schema === 'object' && !Array.isArray(schema);
};

const getExamplesFromMethod = (method?: MethodObject): ExamplePairingObject[] => {
  if (!method) {
    return [];
  }
  if (!method.params) {
    return [];
  }
  const examples: ExamplePairingObject[] = [];

  (method.params as ContentDescriptorObject[]).forEach((param, _index: number) => {
    if (
      param.schema &&
      isJSONSchemaObject(param.schema) &&
      param.schema.examples &&
      param.schema.examples.length > 0
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      param.schema.examples.forEach((ex: any, i: number) => {
        if (!examples[i]) {
          examples.push({
            name: 'generated-example',
            params: [
              {
                name: param.name,
                value: ex,
              },
            ],
            result: {
              name: 'example-result',
              value: null,
            },
          });
        } else {
          examples[i].params.push({
            name: param.name,
            value: ex,
          });
        }
      });
    }
  });
  const methodResult = method.result as ContentDescriptorObject;
  if (
    methodResult &&
    methodResult.schema &&
    isJSONSchemaObject(methodResult.schema) &&
    methodResult.schema.examples &&
    methodResult.schema.examples.length > 0
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methodResult.schema.examples.forEach((ex: any, i: number) => {
      if (!examples[i]) {
        examples.push({
          name: 'generated-example',
          params: [],
          result: {
            name: methodResult.name,
            value: ex,
          },
        });
      } else {
        examples[i].result = {
          name: methodResult.name,
          value: ex,
        };
      }
    });
  }
  return examples;
};

class ExamplePairings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0,
    };
  }
  public componentDidMount() {
    if (!this.props || !this.props.examples) {
      return;
    }
    this.setState({
      currentExample: this.props.examples[0],
    });
  }
  public handleClickListItem = (event: React.MouseEvent) => {
    this.setState({
      anchorEl: event.currentTarget as Element,
    });
  };
  public handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };
  public handleClose = () => {
    this.setState({ anchorEl: null });
  };
  public render() {
    let { examples } = this.props;
    const { method, uiSchema } = this.props;
    const { anchorEl } = this.state;
    examples = examples || getExamplesFromMethod(method);
    if (!examples || examples.length === 0) {
      return null;
    }
    return (
      <AccordionDetails key="examples">
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h5">Examples</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <List component="nav">
              <ListItem
                component={'div'}
                aria-haspopup="true"
                aria-controls="menu-menu"
                aria-label="Method Examples"
                onClick={this.handleClickListItem}
              >
                <ListItemText
                  primary={examples[this.state.selectedIndex].name}
                  secondary={examples[this.state.selectedIndex].summary}
                />
              </ListItem>
              <Menu
                id="menu-menu"
                anchorEl={anchorEl as HTMLElement}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                {examples.map((example, index) => (
                  <MenuItem
                    key={example.name}
                    selected={index === this.state.selectedIndex}
                    onClick={(event) => this.handleMenuItemClick(event, index)}
                  >
                    {example.name}
                  </MenuItem>
                ))}
              </Menu>
            </List>
          </Grid>
          <Grid size={{ xs: 12 }}>
            {examples && (
              <ExamplePairing
                uiSchema={uiSchema}
                paramStructure={this.props.method && this.props.method.paramStructure}
                examplePairing={examples[this.state.selectedIndex]}
                methodName={this.props.method && this.props.method.name}
                reactJsonOptions={this.props.reactJsonOptions}
              />
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
    );
  }
}

export default ExamplePairings;
