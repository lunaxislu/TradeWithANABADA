import styled from 'styled-components';

export const Container = styled.main`
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  place-content: center center;
`;
export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;

  width: 58.8rem;
  height: 40.8rem;
  > :nth-child(1) {
    width: 56%;
  }

  > :nth-child(2) {
    padding: 2.8rem 1.6rem;
    width: 24rem;
    border-radius: 1rem;
    border: 2px solid black;
  }
`;
