import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../../../API/supabase.api';
import { useAuth } from '../../../hooks/userHook/useAuth';
import { Button } from '../../ui/Button';
import * as St from './header.styled';

const HeaderBtnArea = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [uid, setUid] = useState('');

  const { logout } = useAuth();

  const headerNavigateHandler = (path: string) => {
    navigate(`/${path}`);
  };

  const checkUserSession = async () => {
    const userSession = await getUserSession();
    setIsLogin(!!userSession.session);
    if (userSession !== null && userSession.session && userSession.session.user) {
      const userUid = userSession.session?.user.id;
      setUid(userUid);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const headerButton = [
    {
      text: '등록하기',
      isLogin: true,
      clickHandler: () => {
        headerNavigateHandler('write');
      },
    },
    {
      text: '내정보',
      isLogin: true,
      clickHandler: () => {
        headerNavigateHandler(`profile/${uid}`);
      },
    },
    {
      text: 'Talk',
      isLogin: true,
      clickHandler: () => {
        headerNavigateHandler('');
      },
    },
    {
      text: '로그아웃',
      isLogin: true,
      clickHandler: logout,
    },
    {
      text: '로그인',
      isLogin: false,
      clickHandler: () => {
        headerNavigateHandler('auth/login');
      },
    },
  ];
  return (
    <St.HeaderBtnSection>
      {headerButton
        .filter((btn) => btn.isLogin === isLogin)
        .map((btn, index) => (
          <Button key={index} color="default" onClick={btn.clickHandler}>
            {btn.text}
          </Button>
        ))}
    </St.HeaderBtnSection>
  );
};

export default HeaderBtnArea;
