import styled from 'styled-components';

export const Container = styled.div`
  width: 86%;
`;
export const SampleImage = styled.div`
  position: relative;
  height: 100%;

  &:hover {
    &::after {
      opacity: 1;
    }
  }
  &::before {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
  }

  &::after {
    position: absolute;
    content: '샘플 이미지 입니다.';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.4rem;
    opacity: 0.8;
    color: #fff;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
