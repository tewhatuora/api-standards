import MDXComponents from '@theme-original/MDXComponents';
import ApiStandard from '@site/src/components/ApiStandard';
import DetailedDescription from '@site/src/components/DetailedDescription';
import AsyncApiViewer from '@site/src/components/AsyncApiViewer';

export default {
  ...MDXComponents,
  // Custom components to be added globally
  ApiStandard,
  AsyncApiViewer,
  DetailedDescription,
};
