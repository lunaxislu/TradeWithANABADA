import styled from 'styled-components';

export const Container = styled.main`
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  place-content: center center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 32.8rem;
  height: 40.8rem;
  > div {
    width: 100%;
  }

  > :nth-child(2) {
    padding: 2.8rem 1.6rem;
    border-radius: 1rem;
    border: 2px solid #ffae73;
  }
`;
