import { useState, useEffect, Dispatch } from 'react';
import _ from 'lodash';
import refParser from '@apidevtools/json-schema-ref-parser';
import { OpenrpcDocument } from '@open-rpc/tool-types';

const useParsedSchema = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue: object | any
): [OpenrpcDocument | undefined, Dispatch<string>] => {
  const [parsedSchema, setParsedSchema]: [OpenrpcDocument | undefined, Dispatch<OpenrpcDocument>] =
    useState();
  const validateAndSetSchema = (schema: string) => {
    let maybeSchema: string | undefined;
    try {
      maybeSchema = JSON.parse(schema);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (e: any) {
      //
    }
    if (!maybeSchema) {
      return;
    }
    refParser.dereference(maybeSchema).then((dereferencedSchema) => {
      setParsedSchema(dereferencedSchema as OpenrpcDocument);
      // set original non-dereff'd schema to localstorage
      _.defer(() => window.localStorage.setItem('schema', schema as string));
    });
  };
  useEffect(() => {
    if (defaultValue) {
      validateAndSetSchema(defaultValue);
    }
  }, []);
  return [parsedSchema, validateAndSetSchema];
};

export default useParsedSchema;
