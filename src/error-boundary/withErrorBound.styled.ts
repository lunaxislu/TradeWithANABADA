import styled from 'styled-components';

export const ErrorUi = styled.div`
  display: grid;
  min-height: 100vh;
  min-width: 100vw;
  place-content: center center;
`;

export const Wrapper = styled.div`
  display: flex;
  line-height: 1.4;
  width: 46rem;
  padding: 2rem;
  flex-direction: column;
  gap: 3rem;
  div {
    font-size: 2rem;
  }
  p {
    color: red;
    font-size: 3rem;
  }
  button {
    width: 12rem;
    text-align: center;
  }
`;
