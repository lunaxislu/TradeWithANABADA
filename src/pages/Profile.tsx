import styled from 'styled-components';
import ProductList from '../components/profile/ProductList';
import UserInfo from '../components/profile/UserInfo';

const Profile = () => {
  return (
    <>
      <Container>
        <UserInfo />
        <ProductList title={'likes'} />
        <ProductList title={'products'} />
      </Container>
    </>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 3rem;
  padding-top: 13rem;
  border: 0.2rem solid #dcdcdc;
  height: 100vh;
  width: 50rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 80rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 100rem;
  `}
`;

export default Profile;
