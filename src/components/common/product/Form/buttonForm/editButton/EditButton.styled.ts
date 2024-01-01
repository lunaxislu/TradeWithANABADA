import styled, { css } from 'styled-components';
type PropsStyledOfEditButton = {
  $isEdit: boolean;
};
export const Container = styled.div``;
export const EditButton = styled.button<PropsStyledOfEditButton>`
  position: absolute;
  ${(props) => {
    if (!props.$isEdit) {
      return css`
        top: 3rem;
        width: 12rem;
        text-align: center;
        height: 4rem;
        cursor: pointer;
        font-size: 1.2rem;
        right: 5rem;
      `;
    }
    if (props.$isEdit) {
      return css`
        background-color: transparent;
      `;
    }
  }}

  &:hover {
    background-color: #1111eb99;
    border: 1px solid #1111eb99;
    color: #fff;
  }
`;
