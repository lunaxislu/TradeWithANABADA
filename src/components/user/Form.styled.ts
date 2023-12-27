import styled from 'styled-components';

export const FormWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 405px;
  padding: 20px;
  max-width: 100%;
  line-height: 2rem;
  border-radius: 10px;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 2px 2px 8px #ccc;
  transform: translate(-50%, -50%);

  a {
    color: black;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
  }

  h1 {
    margin: 20px;
    font-size: 5rem;
    font-weight: 700;
    text-align: center;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 13px;
    padding-left: 8px;
    border-radius: 3px;
    margin: 7px 0px 5px;
    background-color: #fafafa;
    border: 1px solid #dbdbdb;
  }

  span {
    color: #be3144;
    font-size: 12px;
  }
`;

export const ButtonWrapper = styled.div`
  gap: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const GoogleButton = styled.img`
  width: 50px;
`;

export const KakaoButton = styled.img`
  width: 300px;
  height: 300px;
`;
