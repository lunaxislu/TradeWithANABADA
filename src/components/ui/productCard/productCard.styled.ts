import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 21rem;
  height: 28rem;
  border: 0.2rem solid #dcdcdc;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* ${({ theme }) => theme.mediaQuery.sm`
  width: 25%;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
  `}; */
`;

export const CardImage = styled.section`
  position: relative;
  width: 100%;
  height: 21rem;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HeartSection = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 1rem;
  bottom: 1rem;

  & > span {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
`;

export const CardInfo = styled.section`
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  line-height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & > h1 {
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    & > span:first-child {
      font-size: 1.5rem;
    }
    & > span:last-child {
      font-size: 1rem;
    }
  }
`;
