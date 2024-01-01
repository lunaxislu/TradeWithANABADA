import styled from 'styled-components';

// 등록 form styled-component
export const Container = styled.div``;
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
export const Form = styled.form``;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    display: inline-block;
    cursor: pointer;
    width: 15rem;
    height: 5rem;
    margin-top: 2rem;
    text-align: center;
    font-size: 1.2rem;
    border: 1px solid #333;
  }

  .delete-button {
    &:hover {
      border: 1px solid red;
      background-color: red;
      color: #fff;
    }
  }

  .edit-button {
    &:hover {
      background-color: #1111eb99;
      border: 1px solid #1111eb99;
      color: #fff;
    }
  }
`;
