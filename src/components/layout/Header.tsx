import HeaderBtnArea from './header/HeaderBtnArea';
import SearchCategoryArea from './header/SearchCategoryArea';
import * as St from './header/header.styled';

const Header = () => {
  return (
    <St.Header>
      <h1>ANABADA</h1>
      <SearchCategoryArea />
      <HeaderBtnArea />
    </St.Header>
  );
};

export default Header;
