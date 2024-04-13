import Login from '~/pages/Login'
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: '/', component: Message },
    { path: '/login', component: Login, layout: null },
    { path: '/message', component: Message },
    { path: '/profile', component: Profile}
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }