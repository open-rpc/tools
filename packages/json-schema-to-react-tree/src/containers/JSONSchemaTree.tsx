import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { JSONSchema7 } from 'json-schema';
import { grey, green, purple, yellow, blue, deepOrange, deepPurple } from '@mui/material/colors';
import { Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { v4 as uuid } from 'uuid';

const colorMap: { [k: string]: string } = {
  any: grey[500],
  array: blue[400],
  boolean: blue[500],
  integer: purple[800],
  null: yellow[900],
  number: purple[500],
  string: green[500],
  undefined: grey[500],
  object: blue[900],
  properties: deepPurple[500],
  required: deepOrange[500],
  oneof: blue.A100,
  anyof: blue[200],
  allof: blue.A700,
  enum: green[900],
};

interface IProps {
  schema: JSONSchema7;
  nodeId?: string;
}

interface IRenderNodes {
  schema: JSONSchema7;
  required?: boolean;
}

const RenderNodes: React.FC<IRenderNodes> = ({ schema, required }) => {
  if (schema.anyOf) {
    const itemId = uuid();
    return (
      <TreeItem
        itemId={itemId}
        label={<Typography style={{ color: colorMap.anyof }}>Any Of</Typography>}
      >
        {schema.anyOf.map((s, i) => {
          return (
            <React.Fragment key={uuid()}>
              <RenderNodes schema={s as JSONSchema7} />
              {schema && schema.anyOf && i !== schema.anyOf.length - 1 ? (
                <Divider
                  style={{
                    width: '100px',
                    marginBottom: '10px',
                    marginTop: '10px',
                    height: '3px',
                  }}
                  variant="inset"
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </TreeItem>
    );
  }

  if (schema.allOf) {
    return (
      <TreeItem
        itemId={uuid()}
        label={<Typography style={{ color: colorMap.allof }}>All Of</Typography>}
      >
        {schema.allOf.map((s, i) => {
          return (
            <>
              <RenderNodes schema={s as JSONSchema7} />
              {schema && schema.allOf && i !== schema.allOf.length - 1 ? (
                <Divider
                  style={{
                    width: '100px',
                    marginBottom: '10px',
                    marginTop: '10px',
                    height: '3px',
                  }}
                  variant="inset"
                />
              ) : null}
            </>
          );
        })}
      </TreeItem>
    );
  }

  if (schema.oneOf) {
    return (
      <TreeItem
        itemId={uuid()}
        label={<Typography style={{ color: colorMap.oneof }}>One Of</Typography>}
      >
        <div style={{ marginTop: '10px', marginBottom: '10px' }} />
        {schema.oneOf.map((s, i) => {
          return (
            <>
              <RenderNodes schema={s as JSONSchema7} />
              {schema && schema.oneOf && i !== schema.oneOf.length - 1 ? (
                <Divider
                  style={{
                    width: '100px',
                    marginBottom: '10px',
                    marginTop: '10px',
                    height: '3px',
                  }}
                  variant="inset"
                />
              ) : null}
            </>
          );
        })}
        <div style={{ marginTop: '10px', marginBottom: '10px' }} />
      </TreeItem>
    );
  }

  if (schema.items instanceof Array) {
    return (
      <TreeItem
        itemId={uuid()}
        label={<Typography style={{ color: colorMap.array }}>Array</Typography>}
      >
        <TreeItem
          label={
            schema.description ? (
              <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
                <Typography
                  style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                  variant="caption"
                >
                  description
                </Typography>
                <Typography>{schema.description}</Typography>
              </Grid>
            ) : null
          }
          itemId={uuid()}
        />
        {schema.items.map((s, i) => {
          return (
            <>
              <RenderNodes schema={s as JSONSchema7} />
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {schema && schema.items && i !== (schema.items as any).length - 1 ? (
                <Divider
                  style={{
                    width: '100px',
                    marginBottom: '10px',
                    marginTop: '10px',
                    height: '3px',
                  }}
                  variant="inset"
                />
              ) : null}
            </>
          );
        })}
      </TreeItem>
    );
  }

  if (schema.items instanceof Object) {
    return (
      <TreeItem
        itemId={uuid()}
        label={<Typography style={{ color: colorMap.array }}>Array</Typography>}
      >
        <TreeItem
          label={
            schema.title ? (
              <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
                <Typography
                  style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                  variant="caption"
                >
                  title
                </Typography>
                <Typography>{schema.title}</Typography>
              </Grid>
            ) : null
          }
          itemId={uuid()}
        />
        <TreeItem
          label={
            schema.description ? (
              <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
                <Typography
                  style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                  variant="caption"
                >
                  description
                </Typography>
                <Typography>{schema.description}</Typography>
              </Grid>
            ) : null
          }
          itemId={uuid()}
        />
        <RenderNodes schema={schema.items} />
      </TreeItem>
    );
  }

  if (schema.properties) {
    return (
      <TreeItem
        itemId={uuid()}
        label={<Typography style={{ color: colorMap.object }}>{'Object'}</Typography>}
      >
        <TreeItem
          label={
            schema.title ? (
              <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
                <Typography
                  style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                  variant="caption"
                >
                  title
                </Typography>
                <Typography>{schema.title}</Typography>
              </Grid>
            ) : null
          }
          itemId={uuid()}
        />
        <TreeItem
          label={
            schema.description ? (
              <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
                <Typography
                  style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                  variant="caption"
                >
                  description
                </Typography>
                <Typography>{schema.description}</Typography>
              </Grid>
            ) : null
          }
          itemId={uuid()}
        />
        <TreeItem
          label={<Typography style={{ color: colorMap.properties }}>{'properties'}</Typography>}
          itemId={uuid()}
        >
          {schema.properties &&
            Object.entries(schema.properties).map(([n, s], i: number) => {
              const schem: JSONSchema7 = s as JSONSchema7;
              return (
                <TreeItem key={`schema-${i}`} label={n} itemId={uuid()}>
                  <RenderNodes
                    schema={schem}
                    required={schema.required && schema.required.includes(n)}
                  />
                </TreeItem>
              );
            })}
        </TreeItem>
      </TreeItem>
    );
  }

  return (
    <>
      {schema.title && (
        <TreeItem
          label={
            <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
              <Typography
                style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                variant="caption"
              >
                title
              </Typography>
              <Typography style={{ color: colorMap.title }}>{schema.title}</Typography>
            </Grid>
          }
          itemId={uuid()}
        />
      )}
      {schema.type && (
        <TreeItem
          label={
            <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
              <Typography
                style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                variant="caption"
              >
                type
              </Typography>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Typography style={{ color: colorMap[schema.type as any] }}>{schema.type}</Typography>
            </Grid>
          }
          itemId={uuid()}
        />
      )}
      {schema.description && (
        <TreeItem
          label={
            <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
              <Typography
                style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                variant="caption"
              >
                description
              </Typography>
              <Typography>{schema.description}</Typography>
            </Grid>
          }
          itemId={uuid()}
        />
      )}
      {schema.pattern && (
        <TreeItem
          label={
            <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
              <Typography
                style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                variant="caption"
              >
                pattern
              </Typography>
              <Typography>{schema.pattern}</Typography>
            </Grid>
          }
          itemId={uuid()}
        />
      )}
      {schema.const && (
        <TreeItem
          label={
            <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
              <Typography
                style={{ color: colorMap.undefined, marginRight: '4px', marginLeft: '4px' }}
                variant="caption"
              >
                const
              </Typography>
              <Typography>{schema.const as string}</Typography>
            </Grid>
          }
          itemId={uuid()}
        />
      )}
      {required && (
        <TreeItem
          label={<Typography style={{ color: colorMap.required }}>required</Typography>}
          itemId={uuid()}
        />
      )}
      {schema.enum && (
        <TreeItem
          itemId={uuid()}
          label={
            <Typography style={{ color: colorMap.enum, marginRight: '4px', marginLeft: '4px' }}>
              enum
            </Typography>
          }
        >
          {schema.enum.map((enumType, i) => {
            const str = enumType ? enumType.toString() : null;
            return (
              <TreeItem
                key={`enum-${i}`}
                itemId={uuid()}
                label={
                  <Typography style={{ marginRight: '4px', marginLeft: '4px' }}>{str}</Typography>
                }
              />
            );
          })}
        </TreeItem>
      )}
      {schema.if && (
        <TreeItem
          itemId={uuid()}
          label={
            <Typography style={{ color: colorMap.enum, marginRight: '4px', marginLeft: '4px' }}>
              if
            </Typography>
          }
        >
          <RenderNodes schema={schema.if as JSONSchema7} />
        </TreeItem>
      )}
      {schema.then && (
        <TreeItem
          itemId={uuid()}
          label={
            <Typography style={{ color: colorMap.enum, marginRight: '4px', marginLeft: '4px' }}>
              then
            </Typography>
          }
        >
          <RenderNodes schema={schema.then as JSONSchema7} />
        </TreeItem>
      )}
      {schema.else && (
        <TreeItem
          itemId={uuid()}
          label={
            <Typography style={{ color: colorMap.enum, marginRight: '4px', marginLeft: '4px' }}>
              else
            </Typography>
          }
        >
          <RenderNodes schema={schema.else as JSONSchema7} />
        </TreeItem>
      )}
      {/* <div style={{ marginBottom: "15px" }} /> */}
    </>
  );
};

/*
 * A React component that renders a tree to display JSON Schema types
 */
export const JSONSchemaTree: React.FC<IProps> = ({ schema }) => {
  return (
    <SimpleTreeView
      aria-label="json schema tree"
      slots={{
        expandIcon: ChevronRightIcon,
        collapseIcon: ExpandMoreIcon,
      }}
    >
      <RenderNodes schema={schema} />
    </SimpleTreeView>
  );
};

export default JSONSchemaTree;
