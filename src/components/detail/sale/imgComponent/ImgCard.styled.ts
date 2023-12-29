import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 66%;
  height: 100%;

  .big-img_card {
    height: 86%;

    img {
      border-radius: 12px;
      aspect-ratio: 4/3;
      height: 100%;
    }
  }

  .sl-img_container {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
`;

type SamllImgPropsType = {
  $idx: number;
  $imgIndex: number;
};

export const SmallImg = styled.img<SamllImgPropsType>`
  width: 8rem;
  height: 8rem;
  padding: 1rem;
  border: 2px solid #ffae73;
  border-radius: 12px;
  opacity: ${({ $idx, $imgIndex }) => ($idx === $imgIndex ? 1 : 0.6)};
  cursor: pointer;
  &:hover {
    transition: opacity 0.2s ease-in;
    opacity: 1;
  }
`;
