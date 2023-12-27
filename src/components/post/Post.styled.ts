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

  width: 76.8rem;
  height: 40.8rem;
  > div {
    width: 50%;
    padding: 1.5rem 1rem;
  }
`;
