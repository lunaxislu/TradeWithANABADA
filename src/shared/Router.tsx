import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ChatContainer from '../components/chat/ChatContainer';
import Layout from '../components/layout/Layout';
import { Auth, Detail, Home, Post, Product, Profile } from '../pages';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/:auth" element={<Auth />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/product/" element={<Product />} />
          <Route path="/write" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/chatTest" element={<ChatContainer />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
