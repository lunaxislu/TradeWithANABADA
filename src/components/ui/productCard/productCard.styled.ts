import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 20rem;
  border: 0.2rem solid #dcdcdc;
  display: flex;
  align-items: center;
  /* ${({ theme }) => theme.mediaQuery.sm`
  width: 25%;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
  `}; */
`;

export const CardImage = styled.figure`
  & > img:first-child {
    width: 100%;
    height: 100%;
  }

  & > img:last-child {
    width: 2rem;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    /* ${({ theme }) => theme.mediaQuery.lg`
    width: 2.5rem;
  `}; */
  }
`;

export const CardInfo = styled.section`
  padding: 0.8rem;
  line-height: 2.5rem;

  & > h1 {
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
