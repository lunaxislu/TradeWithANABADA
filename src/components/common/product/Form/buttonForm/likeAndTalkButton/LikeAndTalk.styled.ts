import styled from 'styled-components';

// ProductInfo button- 찜하기 & Talk 하기 버튼 CSS
export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 4.4rem;

  button {
    text-align: center;
    width: 18.6rem;
    height: 4.8rem;
    font-size: 1.6rem;
    width: 18rem;
    height: 4rem;
    font-size: 1.2rem;
    border: 1px solid #aaa;
  }
`;

type PropsOfStyledLikeType = {
  $like: boolean;
};
export const LikeButton = styled.button<PropsOfStyledLikeType>`
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: #ffae73;
    background-color: #ffae73;
    color: #fff;
    font-weight: bold;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 60%;
    transform: translate(-50%, -50%);
  }
  .unlike {
    width: 2rem;
    height: 1.8rem;
  }
  .like path {
    fill: red;
  }
`;
export const TalkButton = styled.button`
  color: #222;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #222;
  }
`;
