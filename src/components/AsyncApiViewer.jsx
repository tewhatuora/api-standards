import { useEffect } from 'react';

const configuration = {
  show: {
    sidebar: false,
    info: true,
    operations: true,
    servers: true,
    messages: true,
    schemas: true,
    errors: true
  },
  expand:{
    messageExamples: true
  },
  sidebar: {
    showServers: 'byDefault',
    showOperations: 'byDefault'
  }
};

function AsyncApiViewer({ id, schema }) {
  useEffect(() => {
    const AsyncApiStandalone = require('@asyncapi/react-component/browser/standalone');
    AsyncApiStandalone.render(
      {
        schema: schema,
        config: configuration,
      },
      document.getElementById(id),
    );

  }, [schema, configuration]);

  return <div id={id}>Loading...</div>;
}

export default AsyncApiViewer;
