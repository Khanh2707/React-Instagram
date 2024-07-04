import Login from "~/pages/Login";
import Register from "~/pages/Register";
import ResetPass from "~/pages/ResetPass";
import Home from "~/pages/Home";
import Message from "~/pages/Message";
import Profile from "~/pages/Profile";
import SettingAccount from "~/pages/SettingAccount";
import Dashboard from "~/pages/Dashboard";
import DetailPostPage from "~/pages/DetailPostPage";
import Authenticate from "~/pages/Authenticate";
import Error from "~/pages/Error";

const publicRoutes = [
  { path: "*", component: Error, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/reset-pass", component: ResetPass, layout: null },
  { path: "/authenticate", component: Authenticate, layout: null },
];

const privateRoutes = [
  { path: "/", component: Home },
  { path: "/message/:params", component: Message },
  { path: "/:id-user", component: Profile },
  { path: "/accounts/:params", component: SettingAccount },
  { path: "/p/:params", component: DetailPostPage },
];

const dashboardRoutes = [
  { path: "/dashboard", component: Dashboard, layout: null },
];

export { publicRoutes, privateRoutes, dashboardRoutes };
