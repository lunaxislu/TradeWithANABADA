import { ReactNode } from 'react';
import styled from 'styled-components';

export const CustomButton = styled.button<{ color: string; active?: boolean }>`
  color: #fff;
  border: none;
  outline: none;
  padding: 5px;
  margin-left: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  line-height: 20px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${(props) => props.color};

  &:hover {
    color: #191919;
    background-color: #fff;
  }
`;

export const CustomButtonAuth = styled(CustomButton)<{ active?: boolean }>`
  margin: 20px 0 0 0;
  padding: 10px;
  border-radius: 0px;
  color: ${(props) => (props.active ? 'gray' : 'white')};
  background-color: ${(props) => (props.active ? '#e7e7e7' : '#191919')};
`;

type StricChildren<T> = T & { children: ReactNode };
type ButtonColors = 'default' | 'success' | 'primary' | 'warning' | 'black';
type ButtonType = 'submit' | 'button' | 'reset';
type buttonMode = 'auth' | 'default';

type ButtonProps = {
  active?: boolean;
  disabled?: boolean;
  type?: ButtonType;
  btnType?: buttonMode;
  color: ButtonColors;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>;
};

const btnColors: Record<ButtonColors, string> = {
  default: '#e31c5f',
  success: '#0abd00',
  primary: '#e31c5f',
  warning: '#ff4444',
  black: '#191919',
};

export const Button = ({ children, color, type, btnType, active, disabled, onClick }: StricChildren<ButtonProps>) => {
  if (btnType === 'auth') {
    return (
      <CustomButtonAuth type={type} disabled={disabled} active={active} color={btnColors[color]} onClick={onClick}>
        {children}
      </CustomButtonAuth>
    );
  } else {
    return (
      <CustomButton color={btnColors[color]} onClick={onClick}>
        {children}
      </CustomButton>
    );
  }
};
