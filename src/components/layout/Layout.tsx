import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Header } from './';

const EmptyContainer = styled.div`
  padding-top: 10rem;
  padding-bottom: 10rem;
  min-height: calc(100vh - 30rem);
`;

const Layout = () => {
  return (
    <>
      <Header />
      <EmptyContainer>
        <Outlet />
      </EmptyContainer>
      <Footer />
    </>
  );
};

export default Layout;
