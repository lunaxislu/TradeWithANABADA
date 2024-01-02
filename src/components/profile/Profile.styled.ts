import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  box-sizing: border-box;
  margin: 3rem auto;
  padding: 3rem;
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

export const ProfileReviewWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQuery.sm`
    gap: 3rem;
    display: flex;
    justify-content: center;
  `}
`;
export const ProfileBox = styled.div`
  display: flex;
  border: solid 0.2rem #dcdcdc;
  width: 100%;
  height: 25rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 35rem;
      height: 25rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 45rem;
      height: 25rem;
  `};
`;
export const ProfileImg = styled.div`
  width: 20rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 17.5rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 22.5rem;
  `}
  & img {
    width: 100%;
    height: 100%;
  }
`;
export const ProfileInfo = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 17.5rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 22.5rem;
  `}
`;
export const Nickname = styled.div`
  padding: 3rem 2rem;
  & input {
    border: none;
    border-bottom: 0.1rem solid #dcdcdc;
    font-size: 2rem;
    width: 100%;
  }
  & p {
    font-size: 2rem;
  }
  & button {
    padding-top: 0.5rem;
    border: none;
    background-color: transparent;
    color: #aaaaaa;
    cursor: pointer;
  }
`;
export const Grade = styled.div`
  background-color: transparent;
  color: #aaaaaa;
  padding-top: 0.8rem;
`;
export const UploadLabel = styled.label`
  text-align: center;
  padding-top: 1.4rem;
  font-size: 1.3rem;
  border: none;
  background-color: #dcdcdc;
  margin: 0 auto;
  margin-bottom: 1rem;
  width: 80%;
  height: 4rem;
  cursor: pointer;
`;

export const ProfileBtn = styled.button`
  border: none;
  background-color: #dcdcdc;
  margin: 0 auto;
  margin-bottom: 1rem;
  width: 80%;
  height: 4rem;
  cursor: pointer;
  font-size: 1.3rem;
  text-align: center;
  &.empty {
    background-color: transparent;
    cursor: auto;
  }
`;

export const ReviewBox = styled.div`
  width: 100%;
  height: 25rem;
  padding: 1rem;
  border: 0.2rem solid #dcdcdc;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 35rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 45rem;
  `}
  & p {
    font-size: 2rem;
    font-weight: bold;
  }
`;
export const ProductListSection = styled.div`
  gap: 40rem;
  margin-top: 5rem;
  flex-direction: row;

  & p {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const ProductListArea = styled.div`
  display: flex;
  width: 100%;

  & > ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const ListTitle = styled.div`
  display: flex;
  font-size: 2rem;
  align-items: center;
  flex-direction: row;
  background-color: beige;
  justify-content: center;
`;

export const ListBtn = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 2rem;
  cursor: pointer;
  text-align: center;
  border-bottom: 0.2rem solid black;
  &:hover {
    background-color: white;
  }
  &.active {
    background-color: white;
    border: 0.2rem solid black;
    border-bottom: none;
  }
`;

export const ListWrapper = styled.div`
  height: 70rem;
  overflow: scroll;
  margin-top: 2rem;

  ul {
    gap: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-direction: column;

    li {
      padding: 2rem;
      border: 0.2rem solid #dcdcdc;

      span {
        font-size: 1.5rem;
        float: right;
      }

      // 부모
      div:nth-of-type(1) {
        /* gap: 2rem; */
        display: flex;
      }
    }
  }
`;

export const ListImage = styled.div`
  img {
    width: 18rem;
    height: 18rem;
    cursor: pointer;
  }
`;

export const PostsWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: end;
  padding: 2rem 0 0 2rem;
  flex-direction: column;

  div:nth-of-type(1) {
    display: flex;
    flex-direction: column;

    p {
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  div:nth-of-type(2) {
    display: flex;

    p:nth-of-type(1) {
      padding: 0.5rem;
      font-weight: 700;
      font-size: 1.5rem;
      border-radius: 0.7rem;
      background-color: #c3e2c2;
    }
    p:nth-of-type(2) {
      padding: 0.5rem;
    }
  }
`;

export const PriceWrapper = styled.div`
  width: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    text-align: center;
  }

  button {
    padding-left: 1.2rem;
    border: 0.1rem solid black;

    &:hover {
      color: white;
      background-color: #e31c5f;
    }
  }

  div {
    font-size: 1.5rem;
    flex-direction: row;
  }
`;
