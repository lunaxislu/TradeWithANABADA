import HomeProductList from '../components/home/HomeProductList';
import HomeSlideBanner from '../components/home/HomeSlideBanner';

const Home = () => {
  return (
    <div>
      <HomeSlideBanner />
      <HomeProductList title="최신 등록 상품" />
      <HomeProductList title="추천 등록 상품" />
      <HomeProductList title="인기 등록 상품" />
    </div>
  );
  // import { useEffect } from 'react';
  // import { getUserData, getUserSession } from '../API/supabase.api';
  // import { useAuth } from '../hooks/userHook/useAuth';

  // const Home = () => {
  //   // 로그인 세션 테스트 코드
  //   const { logout } = useAuth();
  //   useEffect(() => {
  //     const getUserInfo = async () => {
  //       const s = await getUserData();
  //       console.log('getUserInfo: ', s);
  //     };
  //     const getUserToken = async () => {
  //       const s = await getUserSession();
  //       console.log('getUserToken: ', s);
  //     };
  //     getUserInfo();
  //     getUserToken();
  //   }, []);

  //   return (
  //     <>
  //       <h1>Home</h1>
  //       <button onClick={() => logout()}>로그아웃</button>
  //     </>
  //   );
};

export default Home;
