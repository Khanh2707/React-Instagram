import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/Components/Layout';
import { Fragment } from 'react';
import { useStore } from './store';

function App() {
  const [state, dispatch] = useStore()

  console.log(state)

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
