import Form from '../components/user/Form';
import withErrorBound from '../error-boundary/withErrorBound';

const Auth = () => withErrorBound(<Form />);

export default Auth;
