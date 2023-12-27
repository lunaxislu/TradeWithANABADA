import CategoryNav from './CategoryNav';
import SearchArea from './SearchArea';
import * as St from './header.styled';

const SearchCategoryArea = () => {
  return (
    <St.HeaderSearchCategoryArea>
      <CategoryNav />
      <SearchArea />
    </St.HeaderSearchCategoryArea>
  );
};

export default SearchCategoryArea;
