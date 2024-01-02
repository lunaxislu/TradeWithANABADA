import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import useWithErrorBound from '../../error-boundary/withErrorBound';
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
  return useWithErrorBound(
    <>
      <Header />
      <EmptyContainer>
        <Outlet />
      </EmptyContainer>
      <Footer />
    </>,
  );
};

export default Layout;
