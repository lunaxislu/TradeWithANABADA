import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestProducts, getPopularProducts } from '../../API/supabase.api';
import ProductCard from '../ui/productCard/ProductCard';
import * as St from './home.styled';

type ProductListProps = {
  type: string;
};

export type ProductData = {
  product_id: number;
  title: string;
  content: string;
  createdat: string;
  price: string;
  productimg: string[];
  userid: string;
  like_count: number;
  hash_tags: string[];
};

type ProductSectionInfoType = {
  title: string;
  getProductHandler: (arg1: number) => Promise<ProductData[]>;
};

const productSectionInfos: Record<string, ProductSectionInfoType> = {
  latest: {
    title: '최신 상품',
    getProductHandler: getLatestProducts,
  },
  popular: {
    title: '실시간 인기 상품',
    getProductHandler: getPopularProducts,
  },
};

const HomeProductList = ({ type }: ProductListProps) => {
  const [products, setProducts] = useState<ProductData[]>();

  const getProductsData = async () => {
    const data = await productSectionInfos[type].getProductHandler(4);
    setProducts(data);
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <St.ProductListSection>
      <div>
        <h2>{productSectionInfos[type].title}</h2>
        {/* TODO: latest or popular > product page로 이동 */}
        <Link to={''}>{productSectionInfos[type].title} 더보기</Link>
      </div>
      <St.ProductListArea>
        <ul>{products?.map((product) => <ProductCard key={product.product_id} productInfo={product} />)}</ul>
      </St.ProductListArea>
    </St.ProductListSection>
  );
};

export default HomeProductList;
