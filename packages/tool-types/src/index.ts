import type { V1_4, V1_3 } from '@open-rpc/spec-types';

export type { V1_4, V1_3 };

export { spec } from '@open-rpc/spec-types';
export { getExtendedMetaSchema } from '@open-rpc/schema-utils-js';

// Union types for version-agnostic usage
export type OpenrpcDocument = V1_4.OpenrpcDocument | V1_3.OpenrpcDocument;
export type MethodObject = V1_4.MethodObject | V1_3.MethodObject;
export type ContentDescriptorObject = V1_4.ContentDescriptorObject | V1_3.ContentDescriptorObject;
export type JSONSchema = V1_4.JSONSchema | V1_3.JSONSchema;
export type JSONSchemaObject = V1_4.JSONSchemaObject | V1_3.JSONSchemaObject;
export type ReferenceObject = V1_4.ReferenceObject | V1_3.ReferenceObject;
export type MethodOrReference = V1_4.MethodOrReference | V1_3.MethodOrReference;
export type ExamplePairingObject = V1_4.ExamplePairingObject | V1_3.ExamplePairingObject;
export type SchemaComponents = V1_4.SchemaComponents | V1_3.SchemaComponents;
export type ContentDescriptorComponents =
  | V1_4.ContentDescriptorComponents
  | V1_3.ContentDescriptorComponents;
export type ExampleObject = V1_4.ExampleObject | V1_3.ExampleObject;
export type TagObject = V1_4.TagObject | V1_3.TagObject;
export type ErrorObject = V1_4.ErrorObject | V1_3.ErrorObject;
export type ServerObject = V1_4.ServerObject | V1_3.ServerObject;
export type LinkObject = V1_4.LinkObject | V1_3.LinkObject;
