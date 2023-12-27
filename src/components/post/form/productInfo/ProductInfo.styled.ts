import styled from 'styled-components';

export const Container = styled.div`
  > :nth-child(2) {
    margin-top: 1rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  input {
    border: none;
    font-size: 1.5rem;
    color: #222222;
    width: 100%;
    padding: 0.5rem;
    padding-left: 0.8rem;
    border-bottom: solid #aaaaaa 1px;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
    background: none;
    z-index: 5;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #aaaaaa;
    }

    &:focus ~ span,
    &:valid ~ span {
      width: 100%;
    }
  }
`;

export const Span = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0%; /* right로만 바꿔주면 오 - 왼 */
  background-color: #666;
  width: 0;
  height: 2px;
  border-radius: 2px;
  transition: 0.5s;
`;
