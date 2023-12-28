import HomeProductList from '../components/home/HomeProductList';
import HomeSlideBanner from '../components/home/HomeSlideBanner';

const Home = () => {
  return (
    <div>
      <HomeSlideBanner />
      <HomeProductList type="latest" />
      <HomeProductList type="popular" />
    </div>
  );
};

export default Home;
