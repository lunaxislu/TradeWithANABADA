import { ReactNode } from 'react';
import styled from 'styled-components';

const CustomButton = styled.button<{ color: string }>`
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

type StricChildren<T> = T & { children: ReactNode };
type ButtonColors = 'default' | 'success' | 'primary' | 'warning';

type ButtonProps = {
  color: ButtonColors;
  onClick: () => void | Promise<void>;
  className?: string;
};

const btnColors: Record<ButtonColors, string> = {
  default: 'transparent',
  success: '#0abd00',
  primary: '#3081d0',
  warning: '#ff4444',
};

export const Button = ({ children, color, className, onClick }: StricChildren<ButtonProps>) => {
  return (
    <CustomButton className={className} color={btnColors[color]} onClick={onClick}>
      {children}
    </CustomButton>
  );
};
