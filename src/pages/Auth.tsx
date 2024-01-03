import Form from '../components/user/Form';
import useWithErrorBound from '../error-boundary/withErrorBound';

const Auth = () => useWithErrorBound(<Form />);

export default Auth;
