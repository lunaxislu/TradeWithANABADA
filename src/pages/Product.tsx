import ProductLoader from '../components/product/ProductLoader';
import ErrorBoundProvider from '../error-boundary/withErrorBound';

const Product = () => (
  <ErrorBoundProvider>
    <ProductLoader />;
  </ErrorBoundProvider>
);

export default Product;
