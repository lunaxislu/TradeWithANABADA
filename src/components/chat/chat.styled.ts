import styled from 'styled-components';

export const TalkContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  transform: translate(-100%, -100%);
  width: 30rem;
  height: 50rem;
  background-color: beige;
  border-radius: 10px;
  padding: 2rem 1rem;
`;

export const TalkListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
    & h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    & div:last-child {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;
