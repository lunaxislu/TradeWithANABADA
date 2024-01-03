import styled from 'styled-components';

type ButtonProps = {
  $active: boolean;
};

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

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
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
export const Logo = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;

  a {
    font-size: 5rem;
    font-weight: 700;
    color: #191919;
    text-decoration: none;
  }
`;

export const ButtonWrapper = styled.div<ButtonProps>`
  gap: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  a {
    margin-left: 10px;
    color: black;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
  }

  button {
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 15px;
    text-align: center;
    margin: 20px 0px 10px 0px;
    color: ${(props) => (props.$active ? 'gray' : 'white')};
    background-color: ${(props) => (props.$active ? '#F5F7F8' : '#191919')};
  }
  div {
    display: flex;
    font-size: 12px;
    justify-content: center;

    a:hover {
      color: #be3144;
    }
  }
`;

export const SocialButtonWrapper = styled.div`
  gap: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    cursor: pointer;
  }
`;

export const CaptionWrapper = styled.div`
  display: flex;
  height: 180px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    color: #fff;
    width: 100%;
    height: 40px;
    padding: 10px;
    cursor: pointer;
    font-size: 15px;
    margin-top: 10px;
    text-align: center;
    background-color: #191919;
  }
`;
export const P1 = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;
export const P2 = styled.p`
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 10px;
`;
