import Form from '../components/user/Form';
import ErrorBoundProvider from '../error-boundary/withErrorBound';

const Auth = () => (
  <ErrorBoundProvider>
    <Form />
  </ErrorBoundProvider>
);

export default Auth;
