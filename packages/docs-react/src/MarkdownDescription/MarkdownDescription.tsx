import React from "react";
import ReactMarkdown from "react-markdown";

interface IProps {
  source: string;
  className?: string;
}

const MarkdownDescription: React.FC<IProps> = ({ source, className }) => {
  if (!source) {
    return null;
  }
  return (
    <ReactMarkdown className={className}>
      {source}
    </ReactMarkdown>
  );
};

export default MarkdownDescription;
