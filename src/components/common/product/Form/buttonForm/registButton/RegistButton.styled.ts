import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2.8rem;

  text-align: center;
`;
export const RegistProduct = styled.button`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #666;
  box-sizing: border-box;
  &:hover {
    border: 1px solid #ffae73;
    background-color: #ffae73;
    transition: background-color 0.5s;
    color: #fff;
  }
`;
