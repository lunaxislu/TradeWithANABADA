import styled, { css } from 'styled-components';

export const Container = styled.div<{ $status: boolean }>`
  width: 120rem;
  /* height: 80rem; */
  position: relative;
  .product-info {
    display: flex;
    height: 100%;
    gap: 4rem;
  }

  ${(props) => {
    if (props.$status) {
      return css`
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 99;
        }

        &::after {
          content: '판매완료';
          font-size: 9rem;
          position: absolute;
          top: 50%;
          left: 50%;
          color: #fff;
          z-index: 100;
          transform: translate(-50%, -50%);
        }
      `;
    }
  }}
`;
export const Content = styled.div`
  margin-top: 2rem;
  padding: 4rem;

  min-height: 24rem;
  border: 2px solid #aaa;
  border-radius: 12px;
  font-size: 2rem;
`;

export const TextContainer = styled.div`
  position: relative;
  margin-top: 4rem;
  padding: 2.6rem 2.8rem;
  border: 2px solid #666;
  border-radius: 1.2rem;
  .like-talk {
    display: none;
  }
  .title {
    margin-top: 1rem;
    color: #333;
    font-size: 2.8rem;
    font-weight: bold;
  }
`;

export const TextWrapper = styled.div`
  margin-top: 2.4rem;
  min-height: 20rem;
  font-size: 1.4rem;
`;
