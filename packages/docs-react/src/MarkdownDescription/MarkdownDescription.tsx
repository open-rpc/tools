import * as React from "react";
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from "react-syntax-highlighter";

import { materialDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import ReactMarkdown from "react-markdown";
interface IProps {
  className?: string;
  source?: string;
  uiSchema: any;
}
/*
const MarkdownDescriptions: React.FC<IProps> = ({ source, className, uiSchema }) => {
  return (
    <ReactMarkdown
    components={{
      code: ({ inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || "");
        const language = match?.[1] || "";
    
        if (inline) {
          return <code {...props}>{children}</code>; // Inline code.
        }
    
        return (
          <SyntaxHighlighter
            style={uiSchema?.appBar?.["ui:darkMode"] ? materialDark : materialLight}
            language={language}
            PreTag="div"
            {...props}
          >
            {String(children).trim()} // Block code.
          </SyntaxHighlighter>
        );
      },
    }}

      components={{
        code: ({ language, value }) => {
          if (!value) {
            return <pre><code></code></pre>;
          }
          return <SyntaxHighlighter
            style={uiSchema && uiSchema.appBar && uiSchema.appBar["ui:darkMode"] ? materialDark : materialLight}
            language={language}
          >
            {value}
          </SyntaxHighlighter>;
        },
      }}
      className={className}
    >
      {source || ''}
    </ReactMarkdown>
  );
}
*/

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
