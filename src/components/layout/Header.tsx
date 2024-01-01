import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TalkContextProvider from '../../contexts/TalkContext';
import TalkContainer from '../chat/TalkArea';
import HeaderBtnArea from './header/HeaderBtnArea';
import SearchCategoryArea from './header/SearchCategoryArea';
import * as St from './header/header.styled';

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <St.Header>
      <h1 onClick={navigateToHome}>ANABADA</h1>
      <SearchCategoryArea />
      <HeaderBtnArea isLogin={isLogin} setIsLogin={setIsLogin} />
      {isLogin && (
        <TalkContextProvider>
          <TalkContainer />
        </TalkContextProvider>
      )}
    </St.Header>
  );
};

export default Header;
