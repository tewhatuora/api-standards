import React from 'react';

function DetailedDescription({text}) {
  return (
    <details class="long-description">
      <summary class="selected">Detailed description of figure</summary>
      <div>
        <p>{text}</p>
      </div>
    </details>
  );
}

export default DetailedDescription;
