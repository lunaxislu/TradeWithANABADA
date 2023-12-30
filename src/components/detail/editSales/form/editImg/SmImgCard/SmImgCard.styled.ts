import styled from 'styled-components';

type ImgPropsType = {
  $idx: number;
  $imageIndex: number;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 9rem;

  > div {
    position: relative;
    width: 100%;
    height: 9rem;
  }

  label {
    width: 100%;
    height: 9rem;
    cursor: pointer;
    border: 1px solid #aaa;
    text-align: center;
    line-height: 9rem;
    word-break: break-all;
  }
`;

export const Img = styled.img<ImgPropsType>`
  object-fit: cover;
  cursor: pointer;
  height: 100%;
  opacity: ${({ $idx, $imageIndex }) => ($idx === $imageIndex ? 1 : 0.4)};
  &:hover {
    opacity: 1;
  }
`;

export const DeleteImg = styled.span`
  position: absolute;
  right: -0.8rem;
  top: -0.8rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: red;
  cursor: pointer;
`;
