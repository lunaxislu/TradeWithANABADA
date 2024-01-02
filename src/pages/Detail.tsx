import Goods from '../components/detail/Goods';
import withErrorBound from '../error-boundary/withErrorBound';

const Detail = () => withErrorBound(<Goods />);

export default Detail;
