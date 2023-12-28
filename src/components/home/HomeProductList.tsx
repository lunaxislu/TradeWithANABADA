import { useEffect } from 'react';
import { getPopularProducts } from '../../API/supabase.api';

type ProductListProps = {
  type: string;
};

// type ProductSectionInfo = {
//   title: string;
//   getProductHandler: Promise<void>;
// };

// const sectionMode: Record<string, ProductSectionInfo> = {
//   latest: {
//     title: '최신상품',
//     getProductHandler: getLatestProducts,
//   },
//   popular: {
//     title: '인기상품',
//     getProductHandler: async () => {
//       getPopularProducts();
//     },
//   },
//   //   latest: { title: '최신상품', getProductHandler: getLatestProducts },
// };

const HomeProductList = ({ type }: ProductListProps) => {
  const getProductsData = async () => {
    // await sectionMode[type]['getProductHandler']();
    const data = await getPopularProducts();
    console.log(data);
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <section>
      <h2></h2>
      <ul>
        <li>카드1</li>
        <li>카드2</li>
      </ul>
      <button> 더보기</button>
    </section>
  );
};

export default HomeProductList;
