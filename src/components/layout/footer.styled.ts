import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
  /* margin-top: 10rem; */
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > h1 {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  & > div {
    display: flex;
    column-gap: 10rem;

    & > section:first-child {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      font-size: 1.4rem;
    }
    & > section:last-child {
      display: flex;
      column-gap: 1rem;
    }
  }
  & > span {
    align-self: center;
    margin-top: 3rem;
    font-size: 1.2rem;
  }
`;
