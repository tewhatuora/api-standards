import React from "react";
import { Tooltip } from "react-tooltip";

/**
 * Represents an API standard element.
 *
 * @param {Object} props - The properties for the API standard element.
 * @param {string} props.id - The unique identifier for the API standard, in an upper-snake-case format, e.g. . HNZAS_MUSTNOT_X_NOTATION_HEADERS
 * @param {string} props.type - The type of the API standard, which should match the RFC2119 keyword, e.g. "MUST", "MUST NOT"
 * @param {string} props.toolTip - The plain extended text for the API standard which is used in the Summary page and conformance tooling. This should provide additional details about the API standard that makes sense in its own sentence.
 * @returns {JSX.Element} The JSX element representing the API standard.
 *
 * @example
 * // Usage example in Markdown:
 * <ApiStandard id="HNZAS_MUSTNOT_X_NOTATION_HEADERS" type="MUST NOT" toolTip="API Providers **MUST NOT** used X-Notation headers, as they have been deprecated in the HTTP standard.">Providers **MUST NOT** use X- notation headers</ApiStandard>
 */

function ApiStandard({ id, type, toolTip, children }) {
  if (children === undefined || toolTip === undefined) {
    throw new Error(
      "Error in rendering ApiStandard component; please check the format for " +
        id
    );
  }

  return (
    <>
      <p
        data-tooltip-id={id}
        data-tooltip-content={id + ": " + toolTip}
        id={id}
        data-standard-type={type}
        data-extended-text={toolTip}
      >
        {children}
        <sup>{id}</sup>
        <Tooltip id={id} />
      </p>
    </>
  );
}

export default ApiStandard;
