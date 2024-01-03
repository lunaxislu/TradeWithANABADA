import styled from 'styled-components';

export const Container = styled.main`
  position: relative;
  min-width: 100vw;
  min-height: calc(100vh + 30rem);
  display: grid;
  place-content: center center;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Category = styled.span`
  position: absolute;
  top: -5rem;
  left: 0rem;
  font-size: 1.6rem;
  cursor: pointer;
`;
