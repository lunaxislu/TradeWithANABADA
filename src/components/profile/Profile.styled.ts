import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
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
  height: 20rem;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 35rem;
      height: 17.5rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 45rem;
      height: 22.5rem;
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
  padding: 2rem;
  & input {
    border: none;
    border-bottom: 0.1rem solid #dcdcdc;
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
export const UploadImg = styled.label`
  text-align: center;
  padding-top: 1.4rem;
  font-size: 1.3rem;
  border: none;
  background-color: #dcdcdc;
  margin: 0 auto;
  width: 80%;
  height: 4rem;
  cursor: pointer;
`;
export const ProfileEdit = styled.button`
  border: none;
  background-color: #dcdcdc;
  margin: 1rem auto;
  width: 80%;
  height: 4rem;
  cursor: pointer;
`;

export const ReviewBox = styled.div`
  padding: 1rem;
  border: 0.2rem solid #dcdcdc;
  width: 100%;
  ${({ theme }) => theme.mediaQuery.sm`
      width : 35rem;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width : 45rem;
  `}
  & p {
    font-size: 2rem;
  }
`;
export const ProductListSection = styled.div`
  margin-top: 5rem;
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

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const ListBox = styled.div`
  width: 48%;
  border: 0.2rem solid #dcdcdc;
  ${({ theme }) => theme.mediaQuery.sm`
  width: 23%;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
  `};
`;

export const ListImage = styled.figure`
  position: relative;
`;

export const ListImageProduct = styled.img``;

export const ListImageHeart = styled.img`
  width: 2rem;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  ${({ theme }) => theme.mediaQuery.lg`
    width: 2.5rem;
  `};
`;

export const ListInfo = styled.div`
  padding: 0.8rem;
  line-height: 2.5rem;
`;

export const ListPriceandDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ListTitle = styled.div`
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListPrice = styled.div`
  font-size: 1.5rem;
`;

export const ListDate = styled.div``;
