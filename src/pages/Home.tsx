import HomeProductList from '../components/home/HomeProductList';
import HomeSlideBanner from '../components/home/HomeSlideBanner';
import * as St from '../components/home/home.styled';

const Home = () => {
  return (
    <>
      <HomeSlideBanner />
      <St.HomeWrapper>
        <HomeProductList type="latest" />
        <HomeProductList type="popular" />
      </St.HomeWrapper>
    </>
  );
};

export default Home;
