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
      <input />
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

  & > input {
    width: ${(props) => (props.$isOpen ? '0' : '30rem')};
    transition: width 0.5s ease-in-out;
    height: 100%;
    overflow: hidden;
    animation: ${(props) => (props.$isOpen ? 'closeInput 0s 0.5s forwards' : 'openInput 0s 0s forwards')};

    @keyframes closeInput {
      to {
        height: 0;
        border: none;
      }
    }
    @keyframes openInput {
      to {
        height: 100%;
        border: 1px solid black;
      }
    }
  }

  & > button {
  }
`;

export default SearchArea;
