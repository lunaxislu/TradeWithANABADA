import styled from 'styled-components';

export const HeaderSearchCategoryArea = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderBtnSection = styled.section`
  & > button {
    font-size: 2.5rem;
    color: black;
    margin-left: 2rem;
  }
`;

export const CategoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const SideBar = styled.nav<{ $isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 100%;
  height: 100vh;
  width: ${(props) => (props.$isOpen ? '30rem' : '0')};
  transition: width 0.5s ease-in-out;
  background: #027402;
  border-right: 1px solid gray;
  overflow: hidden;

  white-space: nowrap;

  & > span {
    margin-top: 4rem;
    margin-left: 2rem;
    display: inline-block;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

export const CategoryLi = styled.li`
  &:hover {
    background: #012401;
  }
  & a {
    padding: 1rem 2rem;
    display: inline-block;
    width: 100%;
    font-size: 2rem;
    text-decoration: none;
  }
`;
