import styled from 'styled-components';

export const TalkContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  transform: translate(-100%, -100%);
  width: 30rem;
  height: 50rem;
  background-color: red;
  border-radius: 10px;
  z-index: 0;
`;

export const LiveTalkContainer = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  z-index: ${(props) => (props.$isVisible ? 1 : -1)};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: 0.5s ease-in-out;
  top: 0;
  left: 0%;
  transform: translate(-100%, -100%);
  width: 30rem;
  height: 50rem;
  background-color: green;
  border-radius: 10px;
`;
