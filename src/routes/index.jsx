import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPass from "../pages/ResetPass";
import Home from "../pages/Home";
import Message from "../pages/Message";
import Profile from "../pages/Profile";
import SettingAccount from "../pages/SettingAccount";
import Dashboard from "../pages/Dashboard";
import DetailPostPage from "../pages/DetailPostPage";
import Authenticate from "../pages/Authenticate";
import Error from "../pages/Error";

import { createBrowserRouter } from "react-router-dom";

import { DefaultLayout } from "../pages/Layout";
import ProtectedRoute from "./ProtectedRoute";

export default createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
    errorElement: <Error />
  },
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: <ResetPass />,
    path: "/reset-pass",
  },
  {
    element: <Authenticate />,
    path: "/authenticate",
  },
  {
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: (
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        ),
        path: "/",
      },
      {
        element: (
          <DefaultLayout>
            <Message />
          </DefaultLayout>
        ),
        path: "/message/:params",
      },
      {
        element: (
          <DefaultLayout>
            <Profile />
          </DefaultLayout>
        ),
        path: "/:id-user",
      },
      {
        element: (
          <DefaultLayout>
            <SettingAccount />
          </DefaultLayout>
        ),
        path: "/accounts/:params",
      },
      {
        element: (
          <DefaultLayout>
            <DetailPostPage />
          </DefaultLayout>
        ),
        path: "/p/:params",
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRole='ADMIN' />,
    errorElement: <Error />,
    children: [
      {
        element: <Dashboard />,
        path: "/dashboard",
      },
    ],
  },
]);
