import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/Components/Layout';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          { publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />;
          }) }
        </Routes>
    </BrowserRouter>
  );
}

export default App;
