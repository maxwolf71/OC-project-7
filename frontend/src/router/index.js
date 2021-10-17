import { createRouter, createWebHistory } from "vue-router"
import Feed from '../views/Feed.vue'
import Login from '../views/Login.vue'
import Message from '../views/Message.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        name: 'login',
        path: '/',
        component: Login,
        meta: {
            title: 'Login'
        }
    }, 
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        meta: {
            title: 'Profile'
        }
    },
    {
        name: 'feed',
        path: '/feed',
        component: Feed,
        meta: {
            title: 'Feed'
        }
    },
    {
        name: 'message',
        path: '/message',
        component: Message,
        meta: {
            title: 'Message'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach((to) => {
    document.title = to.meta.title // display page meta:title in browser tab
})

export default router