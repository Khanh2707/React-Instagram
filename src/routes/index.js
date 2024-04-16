import Login from '~/pages/Login'
import Home from '~/pages/Home'
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: '/login', component: Login, layout: null }
]

const privateRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/', component: Home },
    { path: '/message', component: Message },
    { path: '/profile', component: Profile}
]

export { publicRoutes, privateRoutes }