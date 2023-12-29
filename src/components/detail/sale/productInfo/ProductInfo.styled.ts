import styled from 'styled-components';

export const Container = styled.div`
  width: 33%;
  height: 100%;
  border: 2px solid #ffae73;
  border-radius: 1.2rem;
  padding: 2.8rem 2.2rem;
`;

export const CreatedDate = styled.span`
  position: absolute;
  right: 0;
`;

export const ProductText = styled.div`
  position: relative;
  .text-wrapper {
    margin-top: 1rem;
    .product-title,
    .product-value {
      font-size: 2rem;
      color: #666;
      font-weight: bold;
    }
    div {
      padding-top: 0.6rem;
      color: #333;
      font-size: 1.4rem;
      margin-top: 0.8rem;
    }

    .product-value {
      margin-top: 2rem;
    }
  }
`;

export const User = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #aaa;
`;
