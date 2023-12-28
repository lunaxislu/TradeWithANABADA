type ProductListProps = {
  title: string;
};

const HomeProductList = ({ title }: ProductListProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        <li>카드1</li>
        <li>카드2</li>
      </ul>
      <button>{title} 더보기</button>
    </section>
  );
};

export default HomeProductList;
