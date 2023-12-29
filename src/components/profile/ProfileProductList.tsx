import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestProducts, getPopularProducts } from '../../API/supabase.api';
import { ProductData } from '../home/HomeProductList';
import ProductCard from '../ui/productCard/ProductCard';
import * as St from './Profile.styled';
import ProfileBtn from './ProfileBtn';

type ProductListProps = {
  type: string;
  uid: string;
};

type ProductSectionInfoType = {
  title: string;
  getProductHandler: (arg1: number) => Promise<ProductData[]>;
};
const productSectionInfos: Record<string, ProductSectionInfoType> = {
  likes: {
    title: '나의 찜 목록',
    getProductHandler: getPopularProducts,
  },
  sales: {
    title: '나의 판매 목록',
    getProductHandler: getLatestProducts,
  },
};
const ProfileProductList = ({ type, uid }: ProductListProps) => {
  const [products, setProducts] = useState<ProductData[]>();
  console.log(uid);

  const getProductsData = async () => {
    const data = await productSectionInfos[type].getProductHandler(4);
    console.log(data);
    const filteredData = data.filter((item) => {
      return item.user_id === uid;
    });
    console.log(filteredData);
    setProducts(data);
  };

  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <St.ProductListSection>
      {products?.map((item) => <ProfileBtn item={item.user_id} />)}
      {/* <List /> */}
      <div>
        <h2>{productSectionInfos[type].title}</h2>

        <Link to={''}>누군가의 페이지로 가기</Link>
      </div>
      <St.ProductListArea>
        <ul>{products?.map((product) => <ProductCard key={product.product_id} productInfo={product} />)}</ul>
      </St.ProductListArea>
    </St.ProductListSection>
  );
};

export default ProfileProductList;
