import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/Components/Layout';
import { Fragment } from 'react';
import { AppProvider } from './Context/AppContext';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <AppProvider>
                        <Layout>
                          <Page />
                        </Layout>
                      </AppProvider>
                    } 
              />
            )
          })}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
