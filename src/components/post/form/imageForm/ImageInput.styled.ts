import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
  > :nth-child(1) {
    img {
      aspect-ratio: 2/3;
      object-fit: cover;
      height: 100%;
    }
  }
  > #file {
    display: none;
  }
`;
