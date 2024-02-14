import Registration from '../components/post/Registration';
import ErrorBoundProvider from '../error-boundary/withErrorBound';

const Post = () => (
  <ErrorBoundProvider>
    <Registration />
  </ErrorBoundProvider>
);

export default Post;
