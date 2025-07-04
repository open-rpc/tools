import React from 'react';
import { JSONSchema4 } from 'json-schema';
import { TableRow, TableCell, Typography, Table, TableHead, TableBody } from '@mui/material';
import JSONSchemaFields from './fields/JSONSchemaFields';
import { grey, green, purple, yellow, blue } from '@mui/material/colors';

interface IProps {
  schema: JSONSchema4;
  required?: boolean;
  name?: string;
}

const styles = {
  cellWidth: {
    width: '70px',
  },
};

const isRequiredArray = (required: true | string[]): required is string[] => {
  return Array.isArray(required);
};

const SchemaRenderer: React.FC<IProps> = ({ schema, required, name }) => {
  if (schema.anyOf) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">
            any of
          </Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <div>
            {schema.anyOf.map((p, i) => (
              <JSONSchemaFields schema={p} key={i} />
            ))}
          </div>
        </TableCell>
      </TableRow>
    );
  }
  if (schema.allOf) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">
            all of
          </Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <div>
            {schema.allOf.map((p, i) => (
              <JSONSchemaFields schema={p} key={i} />
            ))}
          </div>
        </TableCell>
      </TableRow>
    );
  }
  if (schema.oneOf) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">
            one of
          </Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <div>
            {schema.oneOf.map((p, i) => (
              <JSONSchemaFields schema={p} key={i} />
            ))}
          </div>
        </TableCell>
      </TableRow>
    );
  }
  if (schema.items instanceof Array) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">
            array of
          </Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <div>
            {schema.items.map((p, i) => (
              <JSONSchemaFields schema={p} key={i} />
            ))}
          </div>
        </TableCell>
      </TableRow>
    );
  }
  if (schema.items) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">
            array of
          </Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <div>
            <JSONSchemaFields schema={schema.items} />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (schema.properties) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">
            object
          </Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Pattern</TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schema.properties &&
                  Object.entries(schema.properties).map(([n, prop]: [string, JSONSchema4]) => {
                    return (
                      <JSONSchemaFields
                        key={n}
                        schema={prop}
                        name={n}
                        hideHeader={true}
                        required={
                          schema.required &&
                          isRequiredArray(schema.required) &&
                          schema.required.includes(n)
                        }
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  const formatType = (type?: JSONSchema4['type']) => {
    if (Array.isArray(type)) {
      return type.join(' | ');
    }
    return type;
  };

  const colorMap: { [k: string]: string } = {
    any: grey[500],
    array: blue[300],
    boolean: blue[500],
    integer: purple[800],
    null: yellow[900],
    number: purple[500],
    string: green[500],
    undefined: grey[500],
    union: grey[500],
  };
  return (
    <TableRow key={schema.title}>
      <TableCell colSpan={1} style={styles.cellWidth}>
        {name}
      </TableCell>
      <TableCell colSpan={1} style={styles.cellWidth}>
        {schema.title}
      </TableCell>
      <TableCell
        style={{
          ...styles.cellWidth,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: Array.isArray(schema.type) ? colorMap.union : colorMap[schema.type as any],
        }}
      >
        {formatType(schema.type)}
      </TableCell>
      <TableCell style={styles.cellWidth}>{schema.pattern}</TableCell>
      <TableCell style={styles.cellWidth}>{required ? 'true' : 'false'}</TableCell>
      <TableCell style={styles.cellWidth}>{schema.description}</TableCell>
    </TableRow>
  );
};

export default SchemaRenderer;
