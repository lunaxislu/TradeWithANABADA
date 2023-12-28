import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../../API/supabase.api';

type Product = {
  id: string;
  title: string;
  content: string;
  price: number;
  productImg: string;
};

const ProductLoader = () => {
  const { search } = useLocation();
  const { state }: { state: Product[] } = useLocation();
  const decodedSearch = decodeURIComponent(search).replaceAll('?', '');

  useEffect(() => {
    const searchData = async () => {
      const result = await searchProducts(decodedSearch);
      return result;
    };
    searchData();
  }, [decodedSearch]);

  return (
    <>
      <div>해당 페이지는 검색한 키워드의 상품들이 보입니다.</div>
      {state?.map((item) => (
        <div key={item.id}>
          {/* <img src={item.productImg} alt=""/> */}
          <div>{item.title}</div>
          <div>{item.content}</div>
          <div>{item.price}</div>
        </div>
      ))}
    </>
  );
};

export default ProductLoader;
