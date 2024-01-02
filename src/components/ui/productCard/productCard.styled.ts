import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 25rem;
  border-radius: 1rem;
  border: 0.2rem solid #dcdcdc;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* ${({ theme }) => theme.mediaQuery.sm`
  width: 25%;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
  `}; */
  cursor: pointer;
`;

export const CardImage = styled.section`
  position: relative;
  width: 100%;
  height: 21rem;
  & > img {
    border-radius: 1rem;
    width: 100%;
    height: 21rem;
    object-fit: cover;
  }
`;

export const HeartSection = styled.div`
  width: 2.8rem;
  position: absolute;
  display: flex;
  align-items: center;
  right: 1rem;
  bottom: -3rem;

  & > span {
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
`;

export const CardInfo = styled.section`
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  line-height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span {
    font-size: 1.4rem;
  }

  & > h1 {
    width: 100%;
    font-size: 1.8rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      span:nth-of-type(1) {
        font-weight: 700;
        font-size: 1.5rem;
        border-radius: 0.7rem;
        background-color: #f4f27e;
        padding: 0 0.5rem 0 0.5rem;
      }
      span:nth-of-type(2) {
        font-size: 1.5rem;
      }
    }
  }
`;
