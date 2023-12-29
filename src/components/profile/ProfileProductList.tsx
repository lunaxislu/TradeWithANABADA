import { useEffect, useState } from 'react';
import { getLatestProducts, getPopularProducts } from '../../API/supabase.api';
import { ProductData } from '../home/HomeProductList';
import ProductCard from '../ui/productCard/ProductCard';
import * as St from './Profile.styled';

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

  const getProductsData = async () => {
    const data = await productSectionInfos[type].getProductHandler(4);
    // const filteredData = data.filter((item) => {
    //   return item.userid === uid;
    // });
    // console.log(filteredData);
    // setProducts(data);
  };

  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <St.ProductListSection>
      {/* <List /> */}
      <div>
        <h2>{productSectionInfos[type].title}</h2>

        {/* <Link to={''}>{productSectionInfos[type].title} 더보기</Link> */}
      </div>
      <St.ProductListArea>
        <ul>{products?.map((product) => <ProductCard key={product.product_id} productInfo={product} />)}</ul>
      </St.ProductListArea>
    </St.ProductListSection>
  );
};

export default ProfileProductList;
