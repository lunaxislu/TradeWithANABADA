import { LazyExoticComponent, ReactElement, Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Auth } from '../pages';

// 레이지를 적용한 컴포넌트
const Home = lazy(() => import('../pages/Home'));
const Post = lazy(() => import('../pages/Post'));
const Detail = lazy(() => import('../pages/Detail'));
const Product = lazy(() => import('../pages/Product'));
const Profile = lazy(() => import('../pages/Profile'));

const SuspenseWrapper = (Component: LazyExoticComponent<() => ReactElement>): ReactElement => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/:auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={SuspenseWrapper(Home)} />
          <Route path="/write" element={SuspenseWrapper(Post)} />
          <Route path="/detail/:id" element={SuspenseWrapper(Detail)} />
          <Route path="/product" element={SuspenseWrapper(Product)} />
          <Route path="/profile/:id" element={SuspenseWrapper(Profile)} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
