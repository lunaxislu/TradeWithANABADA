import Goods from '../components/detail/Goods';
import useWithErrorBound from '../error-boundary/withErrorBound';

const Detail = () => useWithErrorBound(<Goods />);

export default Detail;
