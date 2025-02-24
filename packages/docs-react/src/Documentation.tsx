import React from "react";
import Info from "./Info/Info";
import Servers from "./Servers/Servers";
import Methods, { IMethodPluginProps, OnMethodToggle } from "./Methods/Methods";
import ContentDescriptors from "./ContentDescriptors/ContentDescriptors";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

interface IProps {
  schema?: OpenrpcDocument;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSchema?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactJsonOptions?: any;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
  onMethodToggle?: OnMethodToggle;
}

const Documentation: React.FC<IProps> = ({
  schema,
  uiSchema,
  reactJsonOptions,
  methodPlugins,
  onMethodToggle,
}) => {
  if (!schema) {
    return null;
  }

  const shouldShowContentDescriptors = !(uiSchema && uiSchema.contentDescriptors && uiSchema.contentDescriptors["ui:hidden"] === true);

  return (
    <>
      <Info schema={schema} />
      <Servers servers={schema.servers} reactJsonOptions={reactJsonOptions} />
      <Methods
        onMethodToggle={onMethodToggle}
        schema={schema}
        uiSchema={uiSchema}
        reactJsonOptions={reactJsonOptions}
        methodPlugins={methodPlugins}
      />
      {shouldShowContentDescriptors &&
        <ContentDescriptors schema={schema} uiSchema={uiSchema}></ContentDescriptors>
      }
    </>
  );
};

export default Documentation;
