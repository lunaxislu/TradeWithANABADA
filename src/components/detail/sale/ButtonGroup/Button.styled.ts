import styled from 'styled-components';

// ProductInfo button 모음
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 2.4rem;

  button {
    text-align: center;
    width: 130px;
    height: 4rem;
    font-size: 1.2rem;
    border: 1px solid #aaa;
  }
`;
type PropsLikeType = {
  $like: boolean;
};
export const LikeButton = styled.button<PropsLikeType>`
  cursor: pointer;
  position: relative;
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
