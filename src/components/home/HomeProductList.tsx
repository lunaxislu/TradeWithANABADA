import { useEffect, useState } from 'react';
import { getLatestProducts, getPopularProducts } from '../../API/supabase.api';

type ProductListProps = {
  type: string;
};

type ProductData = {
  product_id: number;
  title: string;
  content: string;
  createdat: string;
  price: number;
  productimg: string;
  userid: string;
  like_count: number;
};

type ProductSectionInfoType = {
  title: string;
  getProductHandler: () => Promise<ProductData[]>;
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
    const data = await productSectionInfos[type].getProductHandler();
    setProducts(data);
  };

  console.log(products);

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <section>
      <h2>{productSectionInfos[type].title}</h2>
      <ul>
        {products?.map((item) => <li key={item.product_id}>{item.title}</li>)}
        {/* <li>카드1</li>
        <li>카드2</li> */}
      </ul>
      <button> 더보기</button>
    </section>
  );
};

export default HomeProductList;
