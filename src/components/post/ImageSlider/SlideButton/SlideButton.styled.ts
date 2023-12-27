import styled, { css } from 'styled-components';

type Button = {
  $imageIndex: number;
  $showImages: string[];
};

export const ButtonContainer = styled.div`
  button {
    display: block;
    position: absolute;
    opacity: 0;
    top: 0;
    bottom: 0;
    padding: 16px;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;

    &:hover,
    &:focus-visible {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const SlideButton = styled.button<Button>`
  right: ${(props) => props.className === 'right-button' && 0};
  left: ${(props) => props.className === 'left-button' && 0};
  display: ${(props) => {
    if (props.className === 'right-button' && props.$imageIndex === props.$showImages.length - 1) {
      return css`none !important`;
    } else {
      return css`block`;
    }
  }};
  display: ${(props) => {
    if (props.className === 'left-button' && props.$imageIndex === 0) {
      return css`none !important`;
    } else {
      return css`block`;
    }
  }};
`;
