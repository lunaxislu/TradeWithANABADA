import React, { Suspense } from 'react';
import ProductLoader from '../components/product/ProductLoader';

const ProductLazy = React.lazy(() => import('../components/product/ProductLoader'));

const Product = () => {
  return (
    <>
      <Suspense fallback={<ProductLoader />}>
        <ProductLazy />
      </Suspense>
    </>
  );
};

export default Product;
