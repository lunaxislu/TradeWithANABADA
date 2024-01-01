import styled from 'styled-components';

export const TalkContainer = styled.div<{ $talkOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0%;
  opacity: ${(props) => (props.$talkOpen ? 1 : 0)};
  transform: translate(-100%, -100%);
  width: ${(props) => (props.$talkOpen ? '30rem' : '0')};
  height: ${(props) => (props.$talkOpen ? '50rem' : '0')};
  background-color: beige;
  border-radius: 10px;
  transition: 0.5s ease-in-out;
  overflow: hidden;
`;

export const TalkListContainer = styled.div<{ $talkChannelOpen: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  opacity: ${(props) => (props.$talkChannelOpen ? 0 : 1)};
  z-index: ${(props) => (props.$talkChannelOpen ? -5 : 5)};
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 2rem 1rem;
  & > h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & > span {
    font-size: 1.3rem;
    line-height: 1.5rem;
  }

  & > ul {
    margin-top: 1rem;
    background: white;
    height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export const TalkChannelCardItem = styled.li`
  position: relative;
  padding: 2rem 1rem;
  display: flex;
  cursor: pointer;
  &:hover {
    background: gray;
  }
  & > figure {
    margin-right: 1rem;
    & > img {
      height: 5rem;
      width: 5rem;
      object-fit: cover;
    }
  }
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & div:last-child {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const InvisibleMessage = styled.span`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-weight: bold;
  color: red;
  font-size: 1.5rem;
`;

export const TalkMessageContainer = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 2rem 1rem;

  & ul {
    margin: 3rem 0;
    padding: 0 0.5rem;
    height: 35rem;
    overflow-y: scroll;
    background: white;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export const TalkCardUserInfo = styled.div`
  display: flex;
  & > h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    margin-right: 1rem;
  }
`;

export const TalkFormUserInfo = styled.section`
  display: flex;
  align-items: center;

  & > h2 {
    font-size: 2rem;
  }
  & > img {
    width: 5rem;
  }
`;

type style = { 'x-position': string; color: string };
export const TalkMessage = styled.li<{ $subStyle: style }>`
  position: relative;
  margin: 0.8rem 0;
  padding: 1rem;
  max-width: 60%;
  border-radius: 10px 10px ${(props) => (props.$subStyle['x-position'] === 'start' ? '10px 0px' : '0px 10px')};

  font-size: 1.3rem;
  align-self: ${(props) => props.$subStyle['x-position']};

  line-height: 1.5rem;
  background-color: ${(props) => props.$subStyle.color};
  color: ${(props) => (props.$subStyle.color === '#000000' ? '#FFFFFF' : '#000000')};
  border: 1px solid;
  border-color: ${(props) => (props.$subStyle.color === '#000000' ? '#FFFFFF' : '#000000')};

  & > span:last-child {
    left: ${(props) => (props.$subStyle['x-position'] === 'start' ? '0' : 'unset')};
    right: ${(props) => (props.$subStyle['x-position'] === 'end' ? '0' : 'unset')};
  }
  & figure {
    margin-bottom: 0.5rem;
  }
`;

export const MessageContext = styled.span`
  width: 100%;
  word-break: break-all;
`;
export const VisibleChecker = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(-100%, 0);
  color: #000000;
`;

export const MessageDate = styled.span`
  position: absolute;
  font-size: 1rem;
  transform: translate(0, 90%);
  bottom: 0;
  white-space: nowrap;
  color: gray;
`;
