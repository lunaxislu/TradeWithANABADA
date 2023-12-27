import styled from 'styled-components';

const Div = styled.div``;

// 등록 form styled-component
export const Container = styled(Div)`
  background-color: orange;
`;
export const Form = styled.form``;

export const ProductInfo = styled(Div)`
  > input {
    padding: 0.5rem;
    padding-left: 0.8rem;
  }

  > :nth-child(2) {
    margin-top: 1rem;
  }
`;

export const UesrInfo = styled(Div)``;

export const TradeList = styled(Div)``;

export const ButtonContainer = styled(Div)``;
