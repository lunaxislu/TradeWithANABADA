import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Auth, Detail, Home, Post, Product, Profile } from '../pages';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/:auth" element={<Auth />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/write" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
