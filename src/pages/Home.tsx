import HomeProductList from '../components/home/HomeProductList';
import HomeSlideBanner from '../components/home/HomeSlideBanner';
import * as St from '../components/home/home.styled';
import ErrorBoundProvider from '../error-boundary/withErrorBound';

const Home = () => {
  return (
    <ErrorBoundProvider>
      <HomeSlideBanner />
      <St.HomeWrapper>
        <HomeProductList type="latest" />
        <HomeProductList type="popular" />
      </St.HomeWrapper>
    </ErrorBoundProvider>
  );
};

export default Home;
