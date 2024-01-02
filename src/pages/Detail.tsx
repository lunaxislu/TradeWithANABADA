import Goods from '../components/detail/Goods';
import withErrorBound from '../error-boundary/ErrorBound';

const Detail = () => withErrorBound(<Goods />);

export default Detail;
