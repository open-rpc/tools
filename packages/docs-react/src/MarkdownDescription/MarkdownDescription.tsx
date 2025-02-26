import * as React from "react";
import { Prism as SyntaxHighlighter} from "react-syntax-highlighter";

import { materialDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import ReactMarkdown from "react-markdown";
interface IProps {
  className?: string;
  source?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiSchema: any;
}

const MarkdownDescription: React.FC<IProps> = ({ source, className, uiSchema }) => {
  return (
    <ReactMarkdown
      className={className}
      components={{
        code: ({  className, children }) => {
          const match = /language-(\w+)/.exec(className || ""); // Extract language from className.
          const language = match?.[1] || ""; // Default to empty string if no match.

          return (
            <SyntaxHighlighter
              style={ 
                (uiSchema?.appBar?.["ui:darkMode"] ? materialDark : materialLight) 
                }
              language={language}
              PreTag="div"
              source={source}
            >
              {String(children).trim()}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {source || ""}
    </ReactMarkdown>
  );
};

export default MarkdownDescription;
