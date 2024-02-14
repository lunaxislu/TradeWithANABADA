import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import ErrorBoundProvider from '../../error-boundary/withErrorBound';

import MainContextProvider from '../../contexts/MainContext';
import useWithErrorBound from '../../error-boundary/withErrorBound';

import { Footer, Header } from './';

const EmptyContainer = styled.div`
  padding-top: 8rem;
  padding-bottom: 10rem;
  min-height: calc(100vh - 30rem);
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Layout = () => {

  return (
    <ErrorBoundProvider>
      <MainContextProvider>
        <Header />
        <EmptyContainer>
          <Outlet />
        </EmptyContainer>
        <Footer />
      </MainContextProvider>
    </ErrorBoundProvider>
};

export default Layout;
