import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
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
  created_at: string;
  price: string;
  product_img: string[];
  user_id: string;
  status: boolean;
  category1_id: number;
  like_count: number;
  hash_tags: string[];
  category1_name: string;
  category2_name: string;
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
  const { showBoundary } = useErrorBoundary();
  const getProductsData = async () => {
    try {
      const data = await productSectionInfos[type].getProductHandler(0);
      setProducts(data);
    } catch (error) {
      showBoundary(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <St.ProductListSection>
      <div>
        <h2>{productSectionInfos[type].title}</h2>
        <Link to={`/product?search=${productSectionInfos[type].title}`}>{productSectionInfos[type].title} 더보기</Link>
      </div>
      <St.ProductListArea>
        <ul>{products?.map((product) => <ProductCard key={product.product_id} productInfo={product} />)}</ul>
      </St.ProductListArea>
    </St.ProductListSection>
  );
};

export default HomeProductList;
