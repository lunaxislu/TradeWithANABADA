import MainSlideBanner from '../components/main/MainSlideBanner';

const Home = () => {
  return (
    <div>
      <MainSlideBanner />
      <section>
        <h2>방금 등록된 상품</h2>
        <ul>
          <li>카드1</li>
          <li>카드2</li>
        </ul>
        <button>최신 등록 물품 더보기</button>
      </section>
      <section>
        <h2>추천 등록 상품</h2>
        <ul>
          <li>카드1</li>
          <li>카드2</li>
        </ul>
        <button>추천 등록 상품 더보기</button>
      </section>
      <section>
        <h2>인기 등록 물품</h2>
        <ul>
          <li>카드1</li>
          <li>카드2</li>
        </ul>
        <button>인기 등록 물품 더보기</button>
      </section>
    </div>
  );
};

export default Home;
