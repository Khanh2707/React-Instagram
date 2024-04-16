import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '~/Components/Layout';
import { Fragment } from 'react';
import { privateRoutes } from './routes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {privateRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } 
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
