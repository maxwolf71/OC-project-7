import { createRouter, createWebHistory } from "vue-router"
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Feed from '../views/Feed.vue'
import Message from '../views/Message.vue'

const routes = [
    {
        name: 'login',
        path: '/',
        component: Login,
    }, 
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
    },
    {
        name: 'feed',
        path: '/feed',
        component: Feed,
    },
    {
        name: 'message',
        path: '/message',
        component: Message,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router