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
  /* transition: translate 300ms ease-in-out; */
  transition: ${(props) => {
    console.log(props.$noTransition);
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
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 2;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  &:hover {
    background-color: transparent;
    color: #333;
  }
`;
