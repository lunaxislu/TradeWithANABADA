import styled from 'styled-components';

// type
type CardImgType = {
  $imageIndex: number;
  $noTransition: boolean;
};

// styled-component
export const Card = styled.div`
  width: 100%;
  flex-shrink: 0;
  &:hover {
    .delete-button {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const CardImg = styled.img<CardImgType>`
  aspect-ratio: 4/3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
  flex-grow: 0;
  translate: ${(props) => -100 * props.$imageIndex}%;
  transition: ${(props) => {
    if (props.$noTransition) return `none !important`;
    else {
      return `translate 300ms ease-in-out !important`;
    }
  }};
`;

export const DeleteBtn = styled.button`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  font-size: 20px;
  border: none;
  line-height: 2;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: transparent;
    background-color: rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 12px;
    height: 20px;
  }
`;
