import styled from 'styled-components';

export const SlideContainer = styled.div`
  position: relative;
`;

export const SlideViewer = styled.div`
  position: relative;
  width: 100vw;
  height: 60rem;
  overflow: hidden;
  z-index: -1;
`;

export const SlideItems = styled.div<{ $translateX: number }>`
  position: absolute;
  display: flex;
  height: 100%;
  transform: translateX(-${(props) => props.$translateX}%);
`;

export const SlideItem = styled.div<{ $color: string }>`
  width: 100vw;
  height: 100%;
  background: ${(props) => props.$color};
`;

export const SlideButton = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  padding: 0 6rem;
  cursor: pointer;
  &:nth-child(1) {
    left: 0;
  }
  &:nth-child(2) {
    right: 0;
  }
`;
