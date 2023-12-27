import styled from 'styled-components';
import List from './List';

type titleProps = {
  title: string;
};

const ProductList = ({ title }: titleProps) => {
  return (
    <Container>
      {title === 'likes' ? <p>나의 찜 목록</p> : <p>나의 판매 목록</p>}
      <List />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 5rem;
  & p {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export default ProductList;
