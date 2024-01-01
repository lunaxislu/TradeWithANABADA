import styled from 'styled-components';

// 등록 form styled-component
export const Container = styled.div``;

export const Form = styled.form``;
export const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 2rem;

  width: 108.8rem;
  height: 58.8rem;
  > div {
    width: 100%;
  }

  > :nth-child(2) {
    width: 52%;
    padding: 2.8rem 2.6rem;
    border-radius: 1rem;
    border: 2px solid #ffae73;
  }
`;
