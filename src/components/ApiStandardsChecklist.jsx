import React, { useEffect, useState } from "react";

const RFC_DEFINITIONS = {
  MUST: 'This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.',
  "MUST NOT":
    'This phrase, or the phrase "SHALL NOT", mean that the definition is an absolute prohibition of the specification.',
  SHOULD:
    'This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.',
  "SHOULD NOT":
    'This phrase, or the phrase "NOT RECOMMENDED" mean that there may exist valid reasons in particular circumstances when the particular behavior is acceptable or even useful, but the full implications should be understood and the case carefully weighed before implementing any behavior described with this label.',
  MAY: 'This word, or the adjective "OPTIONAL", mean that an item is truly optional. One vendor may choose to include the item because a particular marketplace requires it or because the vendor feels that it enhances the product while another vendor may omit the same item.',
};

const ApiStandardsChecklist = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/api-standards.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createTable = (tableData) => {
    return (
      <table style={{ maxWidth: "100%" }}>
        <thead>
          <tr>
            <th>Standard</th>
            <th style={{ width: "50px" }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>
                <p style={{ marginBottom: "10px", wordWrap: "break-all" }}>
                  <strong>{item.id}</strong>
                </p>
                <p style={{ marginBottom: 0 }}>{item.content}</p>
              </td>
              <td>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-external-link"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <p>
        The below table captures the API Standards according to{" "}
        <a href="https://datatracker.ietf.org/doc/html/rfc2119">RFC 2119</a> in
        this document into one place.
      </p>
      {data ? (
        <div>
          {Object.keys(data).map((key) => (
            <div key={key}>
              <h3 id={key}>{key}</h3>
              <p>{RFC_DEFINITIONS[key]}</p>
              {createTable(data[key])}
            </div>
          ))}
        </div>
      ) : (
        <p>This page is generated as part of the build process.</p>
      )}
    </div>
  );
};

export default ApiStandardsChecklist;
