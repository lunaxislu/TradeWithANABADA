import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../../styles/assets/search.svg';

const SearchArea = () => {
  const [searchInputOpen, setSearchInputOpen] = useState<boolean>(false);

  const toggleSearchInput = () => {
    setSearchInputOpen((prev) => !prev);
  };
  return (
    <StSearchInput $isOpen={searchInputOpen}>
      <input placeholder="검색어를 입력하세요" />
      <button onClick={toggleSearchInput}>
        <Search />
      </button>
    </StSearchInput>
  );
};

const StSearchInput = styled.section<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  height: 5rem;

  & > input {
    border: none;
    background: none;
    outline: none;

    border-bottom: 1px solid black;
    width: ${(props) => (props.$isOpen ? '0' : '30rem')};
    transition: width 0.5s ease-in-out;
    height: 100%;
    overflow: hidden;
    animation: ${(props) => (props.$isOpen ? 'closeInput 0s 0.5s forwards' : 'openInput 0s 0s forwards')};
    font-size: 2.5rem;

    @keyframes closeInput {
      to {
        height: 0;
      }
    }
    @keyframes openInput {
      to {
        height: 100%;
      }
    }
  }

  & > button {
    margin-left: 1rem;
    border: none;
    background: none;
    height: 100%;
    cursor: pointer;
  }
`;

export default SearchArea;
