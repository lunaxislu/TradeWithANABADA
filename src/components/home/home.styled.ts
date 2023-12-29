import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 100rem;
  margin: auto;
`;
export const SlideContainer = styled.div`
  position: relative;

  z-index: 0;
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
  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
`;

export const ProductListSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  & > h2 {
    align-self: flex-start;
    font-size: 2rem;
    font-weight: bold;
  }
  & > button {
    position: absolute;
  }
`;

export const ProductListArea = styled.div`
  display: flex;
  width: 100%;

  & > ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
