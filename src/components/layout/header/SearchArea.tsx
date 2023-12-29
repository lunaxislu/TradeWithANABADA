import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '../../../styles/assets/leftArrow.svg';
import { ReactComponent as Search } from '../../../styles/assets/search.svg';
import * as St from './header.styled';

const SearchArea = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [searchInputOpen, setSearchInputOpen] = useState<boolean>(false);

  const toggleSearchInput = () => {
    setSearchInputOpen((prev) => {
      if (!prev) inputRef.current?.focus();
      if (prev) inputRef.current!.value = '';
      return !prev;
    });
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current?.value) {
      alert('값을 입력해주세요');
      return;
    }
    // TODO: navigate to detail.. useParams 구성 필요
    navigate(`/product?search=${inputRef.current.value}`);
  };

  return (
    <St.SearchInput $isOpen={searchInputOpen} onSubmit={searchHandler}>
      <input placeholder="검색어를 입력하세요" ref={inputRef} />
      <button type="button" onClick={toggleSearchInput}>
        {searchInputOpen ? <LeftArrow /> : <Search />}
      </button>
    </St.SearchInput>
  );
};

export default SearchArea;
