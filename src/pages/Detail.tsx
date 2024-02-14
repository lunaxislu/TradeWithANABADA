import Goods from '../components/detail/Goods';
import ErrorBoundProvider from '../error-boundary/withErrorBound';

const Detail = () => (
  <ErrorBoundProvider>
    <Goods />
  </ErrorBoundProvider>
);

export default Detail;
