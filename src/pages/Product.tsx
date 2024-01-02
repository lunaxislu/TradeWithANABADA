import ProductLoader from '../components/product/ProductLoader';
import withErrorBound from '../error-boundary/withErrorBound';

const Product = () => withErrorBound(<ProductLoader />);

export default Product;
