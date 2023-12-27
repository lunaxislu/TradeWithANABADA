import styled from 'styled-components';
import { Button } from '../../ui/Button';

const HeaderBtnArea = () => {
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
    <StHeaderBtnSection>
      {headerButton
        .filter((btn) => btn.isLogin === currentLoginStatus)
        .map((btn, index) => (
          <Button key={index} color="default" onClick={btn.clickHandler}>
            {btn.text}
          </Button>
        ))}
    </StHeaderBtnSection>
  );
};

const StHeaderBtnSection = styled.section`
  & > button {
    font-size: 2.5rem;
    color: black;
    margin-left: 2rem;
  }
`;

export default HeaderBtnArea;
