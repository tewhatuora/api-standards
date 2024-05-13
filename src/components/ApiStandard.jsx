import React from 'react';
import Markdown from 'react-markdown';
import { Tooltip } from 'react-tooltip';

/**
 * Represents an API standard element.
 *
 * @param {Object} props - The properties for the API standard element.
 * @param {string} props.id - The unique identifier for the API standard, in the format 'B-1' or 'C-5.5' to indicate the section it is part of.
 * @param {string} props.type - The type of the API standard, which should match the RFC2119 keyword, e.g. "MUST", "MUST NOT"
 * @param {string} props.text - The MARKDOWN display text for the API standard which is shown in place. This can differ slightly from extendedText.
 * @param {string} props.extendedText - The plain extended text for the API standard which is used in the Summary page and conformance tooling. This should provide additional details about the API standard that makes sense in its own sentence.
 * @returns {JSX.Element} The JSX element representing the API standard.
 *
 * @example
 * // Usage example in Markdown:
 * <ApiStandard id="C-1" type="MUST" text="Providers **MUST NOT** use X- notation headers" extendedText="API Providers **MUST NOT** used X-Notation headers, as they have been deprecated in the HTTP standard."/>
 */
function ApiStandard({id, type, text, extendedText}) {
  // override the <p> tag to include the id as superscript
  const components = {
    p (props) {
      const {node, children,...rest} = props;
      return <p {...rest}>{children} <sup>{id}</sup></p>
    }
  };

  return (
    <>
      <div
        data-tooltip-id={id}
        data-tooltip-content={id + ': ' + extendedText}
        id={id} 
        data-standard-type={type}
        data-extended-text={extendedText}>
        <Markdown components={components}>{`${text}`}</Markdown>
        <Tooltip id={id} />
      </div>
    </>
  );
}

export default ApiStandard;