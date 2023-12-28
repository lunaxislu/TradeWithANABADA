import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  height: 10rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #d9d9d9;

  padding: 0 3rem;

  z-index: 20;

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
  /* border-right: 1px solid gray; */
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

export const SearchInput = styled.form<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  height: 5rem;
  padding-left: 1rem;

  & input {
    border: none;
    background: none;
    outline: none;
    margin-right: 1rem;

    border-bottom: 1px solid black;
    width: ${(props) => (props.$isOpen ? '30rem' : '0')};
    transition: width 0.5s ease-in-out;
    height: 100%;
    overflow: hidden;
    animation: ${(props) => (props.$isOpen ? 'openInput 0s 0s forwards' : 'closeInput 0s 0.5s forwards')};
    font-size: 2.5rem;

    @keyframes closeInput {
      to {
        height: 0;
      }
    }
    @keyframes openInput {
      to {
        height: 100%;
      }
    }
  }

  & > button {
    border: none;
    background: none;
    height: 100%;
    cursor: pointer;
  }
`;
