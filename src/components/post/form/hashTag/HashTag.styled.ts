import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2.8rem;
  padding-top: 0.5rem;

  .hasTag-title {
    color: #aaa;
    letter-spacing: 0.1rem;
    font-weight: bold;
    padding-left: 0.4rem;
    cursor: pointer;
  }
`;

export const HashTagWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.8rem;
  position: relative;

  .hash-tag {
    color: #fff;
    font-weight: bold;
    padding: 0.6rem;
    margin-right: 1rem;
    margin-bottom: 0.8rem;
    border-radius: 1rem;
    letter-spacing: 0.1px;
    background-color: #ffae73;
    cursor: pointer;
  }

  input {
    border: none;
    outline: none;
    width: auto;
    font-size: 1rem;
    color: #666;
  }
  span {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #ffae73;
    width: 100%;
    height: 1px;
    border-radius: 2px;
  }
`;
