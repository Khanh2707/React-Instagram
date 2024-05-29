import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { privateRoutes, publicRoutes, dashboardRoutes } from './routes';
import { DefaultLayout } from '~/pages/Layout';
import ProtectedRoute from '~/routes/ProtectedRoute';

function App() {

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
              <ProtectedRoute>
                <Layout>
                  <Page />
                </Layout>
              </ProtectedRoute>
            } />
          )
        })}
        {dashboardRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={
              <ProtectedRoute requiredRole="ADMIN">
                <Layout>
                  <Page />
                </Layout>
              </ProtectedRoute>
            } />
          )
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
