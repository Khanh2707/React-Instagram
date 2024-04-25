import Login from '~/pages/Login'
import Register from '~/pages/Register'
import ResetPass from '~/pages/ResetPass'
import Home from '~/pages/Home'
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';
import SettingAccount from '~/pages/SettingAccount';
import Dashboard from '~/pages/Dashboard';

const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/reset-pass', component: ResetPass, layout: null }
]

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/message', component: Message },
    { path: '/:id-user', component: Profile},
    { path: '/accounts/:params', component: SettingAccount},
]

const dashboardRoutes = [
    { path: '/dashboard', component: Dashboard, layout: null}
]

export { publicRoutes, privateRoutes, dashboardRoutes }