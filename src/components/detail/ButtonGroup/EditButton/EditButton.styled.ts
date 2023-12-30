import styled, { css } from 'styled-components';
type PropsType = {
  $isEdit: boolean;
};
export const EditButton = styled.button<PropsType>`
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
        background-color: red;
      `;
    }
  }}

  &:hover {
    background-color: #1111eb99;
    color: #fff;
  }
`;
