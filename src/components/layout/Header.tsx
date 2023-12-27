import { useNavigate } from 'react-router-dom';
import HeaderBtnArea from './header/HeaderBtnArea';
import SearchCategoryArea from './header/SearchCategoryArea';
import * as St from './header/header.styled';

const Header = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <St.Header>
      <h1 onClick={navigateToHome}>ANABADA</h1>
      <SearchCategoryArea />
      <HeaderBtnArea />
    </St.Header>
  );
};

export default Header;
