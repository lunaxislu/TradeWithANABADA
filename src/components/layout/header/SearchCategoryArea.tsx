import styled from 'styled-components';
import CategoryNav from './CategoryNav';
import SearchArea from './SearchArea';

const SearchCategoryArea = () => {
  return (
    <StHeaderSearchCategoryArea>
      <CategoryNav />
      <SearchArea />
    </StHeaderSearchCategoryArea>
  );
};

const StHeaderSearchCategoryArea = styled.div`
  display: flex;
`;

export default SearchCategoryArea;
