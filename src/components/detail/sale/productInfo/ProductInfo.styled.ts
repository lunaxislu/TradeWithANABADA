import styled from 'styled-components';

export const Container = styled.div`
  width: 40%;
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

  .user-wrapper {
    padding: 2.4rem 1.4rem;
    border: 1px solid #aaa;
    border-radius: 12px;
    a {
      padding: 1rem;
      margin-top: 1rem;
      text-align: center;
      display: block;
      border: 1px solid #aaa;
      border-radius: 0.8rem;
      cursor: pointer;
      &:hover {
        border: 1px solid #ffae73;
        background-color: #ffae73;
        color: #fff;
      }
    }
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
    }
  }

  .user-name {
    font-size: 1.4rem;
    font-weight: bold;
    color: #666;
  }

  .user-point {
    margin-top: 0.4rem;
    color: orange;
    word-break: keep-all;
    line-height: 1.3;
  }
`;

export const HashTag = styled.div`
  margin-top: 2.4rem;

  h4 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #666;
  }

  .tag-wrapper {
    margin-top: 1.4rem;

    span {
      display: inline-block;
      border-radius: 1.2rem;
      padding: 0.6rem 1.2rem;
      color: #fff;
    }
    > :nth-child(1) {
      background-color: #ffae73;
    }

    > :nth-child(2) {
      background-color: #d78ce7;
    }

    > :nth-child(3) {
      background-color: #81de8e;
    }
    > :nth-child(4) {
      background-color: #edc272;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 2.4rem;
`;
