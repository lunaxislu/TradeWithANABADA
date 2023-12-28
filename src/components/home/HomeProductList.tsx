import { useEffect } from 'react';
import { getLatestProducts } from '../../API/supabase.api';

type ProductListProps = {
  type: string;
};

const sectionMode = {
  latest: { title: '최신상품', getProductHandler: getLatestProducts },
  popular: { title: '최신상품', getProductHandler: getLatestProducts },
  //   latest: { title: '최신상품', getProductHandler: getLatestProducts },
};

const HomeProductList = ({ type }: ProductListProps) => {
  const getLatestData = async () => {
    await getLatestProducts();
  };

  useEffect(() => {
    getLatestData();
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
