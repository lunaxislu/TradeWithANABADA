import styled from 'styled-components';

const Profile = () => {
  return (
    <Container>
      <ProfileReviewWrapper>
        <ProfileBox>
          <ProfileImg>
            <img src={process.env.PUBLIC_URL + '/profile.jpeg'} />
          </ProfileImg>
          <ProfileInfo>
            <Nickname>
              <p>강나연</p>
              <button>닉네임 변경하기</button>
            </Nickname>
            <ProfileEdit>프로필 변경하기</ProfileEdit>
          </ProfileInfo>
        </ProfileBox>
        <ReviewBox>
          <p>나의 거래 후기</p>
        </ReviewBox>
      </ProfileReviewWrapper>

      <p>찜 목록</p>
      <LikesList></LikesList>
      <p>나의 판매 목록</p>
      <ProductList></ProductList>
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem auto;
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
const ProfileReviewWrapper = styled.div`
  ${({ theme }) => theme.mediaQuery.sm`
        display: flex;
  `}
`;
const ProfileBox = styled.div`
  display: flex;
  margin: 0 auto;
  border: solid 0.2rem #dcdcdc;
  width: 48rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 35rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 45rem;
  `}
`;
const ProfileImg = styled.div`
  width: 20rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 17.5rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 22.5rem;
  `}
`;
const ProfileInfo = styled.div`
  ${({ theme }) => theme.mediaQuery.lg`
width : 200px;
margin: 0 auto;
`}
`;
const Nickname = styled.div`
  & p {
    font-size: 2rem;
  }
  & button {
    border: none;
    background-color: transparent;
  }
`;
const ProfileEdit = styled.button`
  border: none;
  background-color: transparent;
`;

const ReviewBox = styled.div`
  margin: 0 auto;
  border: 0.2rem solid #dcdcdc;
  width: 48rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 35rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 45rem;
  `}
`;
const LikesList = styled.div``;
const ProductList = styled.div``;

export default Profile;
