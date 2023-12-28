import styled from 'styled-components';

export const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  &:hover {
    .button-group button {
      opacity: 1;
    }
  }
  position: relative;
`;
