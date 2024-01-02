import styled from 'styled-components';

export const Container = styled.div`
  width: 70%;
  padding: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  width: 92%;
  display: flex;
  padding: 2rem;
  flex-direction: row;

  span {
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

export const List = styled.ul`
  gap: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  li {
    gap: 2rem;
    width: 24.7rem;
    display: flex;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    flex-direction: column;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 8px #ccc;
  }

  img {
    /* margin: 0 auto; */
    border-radius: 1rem;
    width: 24.7rem;
    height: 25rem;
    object-fit: cover;
  }

  div {
    font-size: 1.8rem;
  }

  span {
    font-size: 1.8rem;
  }
`;

export const HeartBox = styled.section`
  width: 3rem;
  gap: 0.5rem;
  display: flex;
  margin-left: 20rem;
  align-items: center;

  span {
    font-size: 1.5rem;
  }
`;

export const Content = styled.div`
  gap: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  p:nth-of-type(1) {
    font-size: 2.5rem;
    font-weight: 700;
  }
  p:nth-of-type(2) {
    font-size: 1.5rem;
  }

  div {
    display: flex;
    font-size: 1.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
      p:nth-of-type(1) {
        font-size: 1.5rem;
        font-weight: 700;
        border-radius: 0.7rem;
        background-color: #f4f27e;
        padding: 0.2rem 0.5rem 0.2rem 0.5rem;
      }
      p:nth-of-type(2) {
        padding: 0.5rem;
      }
    }
    span {
      font-size: 1.3rem;
      padding: 0.5rem;
    }
  }
`;
