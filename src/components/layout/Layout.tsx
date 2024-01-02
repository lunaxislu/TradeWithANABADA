import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainContextProvider from '../../contexts/MainContext';
import { Footer, Header } from './';

const EmptyContainer = styled.div`
  padding-top: 10rem;
  padding-bottom: 10rem;
  min-height: calc(100vh - 30rem);
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Layout = () => {
  return (
    <>
      <MainContextProvider>
        <Header />
        <EmptyContainer>
          <Outlet />
        </EmptyContainer>
        <Footer />
      </MainContextProvider>
    </>
  );
};

export default Layout;
