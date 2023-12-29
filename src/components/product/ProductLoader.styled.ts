import styled from 'styled-components';

export const Container = styled.div`
  padding: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
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
    gap: 10px;
    height: 40rem;
    padding: 10px;
    display: flex;
    position: relative;
    border: 1px solid #ccc;
    flex-direction: column;
  }

  img {
    width: 30rem;
    height: 30rem;
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
  gap: 0.5rem;
  top: -15rem;
  right: 2rem;
  display: flex;
  position: absolute;
  align-items: center;
`;
