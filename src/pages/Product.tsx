import ProductLoader from '../components/product/ProductLoader';
import useWithErrorBound from '../error-boundary/withErrorBound';

const Product = () => useWithErrorBound(<ProductLoader />);

export default Product;
