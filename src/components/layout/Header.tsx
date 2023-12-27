import styled from 'styled-components';
import { ReactComponent as HamburgMenu } from '../../styles/assets/hamburgerMenu.svg';
import { ReactComponent as Search } from '../../styles/assets/search.svg';
import { Button } from '../ui/Button';

const Header = () => {
  // 로그인 상태 (테스트용)
  const currentLoginStatus = true;

  const dummyEvent = () => {};

  const headerButton = [
    { text: '등록하기', isLogin: true, clickHandler: dummyEvent },
    { text: '내정보', isLogin: true, clickHandler: dummyEvent },
    { text: 'Talk', isLogin: true, clickHandler: dummyEvent },
    { text: '로그인', isLogin: true, clickHandler: dummyEvent },
    { text: '로그아웃', isLogin: false, clickHandler: dummyEvent },
  ];

  return (
    <StHeader>
      <h1>ANABADA</h1>

      <StHeaderSearchCategoryArea>
        <HamburgMenu />
        <section>
          <input />
          <Search />
        </section>
      </StHeaderSearchCategoryArea>

      <StHeaderBtnSection>
        {headerButton
          .filter((btn) => btn.isLogin === currentLoginStatus)
          .map((btn, index) => (
            <Button key={index} color="default" onClick={btn.clickHandler}>
              {btn.text}
            </Button>
          ))}
      </StHeaderBtnSection>
    </StHeader>
  );
};

const StHeader = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  height: 10rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #d9d9d9;

  padding: 0 3rem;

  & > h1 {
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);

    font-size: 7rem;
    font-weight: bold;

    cursor: pointer;
  }
`;

const StHeaderBtnSection = styled.section`
  & > button {
    font-size: 2.5rem;
    color: black;
    margin-left: 2rem;
  }
`;

const StHeaderSearchCategoryArea = styled.div`
  display: flex;
`;

export default Header;
