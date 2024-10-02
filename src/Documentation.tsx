import React from "react";
import Info from "./Info/Info";
import Servers from "./Servers/Servers";
import Methods, { IMethodPluginProps, OnMethodToggle } from "./Methods/Methods";
import ContentDescriptors from "./ContentDescriptors/ContentDescriptors";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

interface IProps {
  schema?: OpenrpcDocument;
  uiSchema?: any;
  reactJsonOptions?: any;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
  onMethodToggle?: OnMethodToggle;
}

export default class Documentation extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { schema, uiSchema, reactJsonOptions, onMethodToggle } = this.props;
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
          methodPlugins={this.props.methodPlugins}
        />
        {shouldShowContentDescriptors &&
          <ContentDescriptors schema={schema} uiSchema={uiSchema}></ContentDescriptors>
        }
      </>
    );
  }
}
