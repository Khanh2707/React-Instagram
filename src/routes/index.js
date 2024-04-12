import Login from '~/pages/Login'
import Message from '~/pages/Message';

const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/message', component: Message },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }