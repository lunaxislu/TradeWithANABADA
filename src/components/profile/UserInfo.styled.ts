import styled from 'styled-components';

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
