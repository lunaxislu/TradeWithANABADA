import styled from 'styled-components';
import HeaderBtnArea from './header/HeaderBtnArea';
import SearchCategoryArea from './header/SearchCategoryArea';

const Header = () => {
  return (
    <StHeader>
      <h1>ANABADA</h1>
      <SearchCategoryArea />
      <HeaderBtnArea />
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

export default Header;
