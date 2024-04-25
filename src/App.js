import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from '~/Components/Layout';
import { Fragment, useContext } from 'react';
import { privateRoutes, publicRoutes, dashboardRoutes } from './routes';
import { AppContext } from './Context/AppContext';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Chuyển đổi thành boolean
}

function App() {
  const {
    roles,
  } = useContext(AppContext)

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
          )
        })}
        {privateRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={
              isAuthenticated() ? (
                <Layout>
                  <Page />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
            />
          )
        })}
        {dashboardRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={
              isAuthenticated() && roles === 'ADMIN' ? (
                <Layout>
                  <Page />
                </Layout>
              ) : (
                <Navigate to="/" replace />
              )
            } 
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
