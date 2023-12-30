import styled from 'styled-components';

export const Container = styled.div`
  width: 120rem;
  height: 80rem;
  .product-info {
    display: flex;
    height: 100%;
    gap: 4rem;
  }
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
