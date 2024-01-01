import styled from 'styled-components';

export const Container = styled.div`
  > :nth-child(1) {
    margin-top: 2.3rem;
  }
  > :nth-child(2) {
    margin-top: 3.3rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;

  input {
    border: none;
    font-size: 1.2rem;
    color: #666;
    width: 100%;
    padding: 0.5rem;
    border-bottom: solid #ffae73 1px;
    padding-bottom: 0.8rem;
    padding-left: 7rem;
    position: relative;
    background: none;
    z-index: 5;

    &:focus {
      outline: none;
    }

    &:focus ~ label,
    &:valid ~ label {
      font-size: 16px;
      left: 10px;
      color: #666;
      font-weight: bold;
    }

    &::placeholder {
      color: #aaaaaa;
    }

    &:focus ~ span,
    &:valid ~ span {
      width: 100%;
    }
  }

  label {
    position: absolute;
    cursor: pointer;
    color: #aaa;
    left: 10px;
    font-size: 1.8rem;
    bottom: 10px;
    transition: all 0.2s;
  }
`;

export const Span = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0%;
  background-color: #ffae73;
  width: 0;
  height: 2px;
  border-radius: 2px;
  transition: 0.5s;
`;
