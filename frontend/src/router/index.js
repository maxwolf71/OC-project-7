import { createRouter, createWebHistory } from "vue-router"
import Feed from '../views/messages/Feed.vue'
import Login from '../views/users/Login.vue'
import Message from '../views/messages/Message.vue'
import Profile from '../views/users/Profile.vue'
import NotFound from '../views/NotFound.vue'
import OneMessage from '../views/messages/OneMessage.vue'

const routes = [
    {
        name: 'Login',
        path: '/',
        component: Login,
        meta: {
            title: 'Login'
        }
    }, 
    {
        name: 'Profile',
        path: '/profile',
        component: Profile,
        meta: {
            title: 'Profile'
        }
    },
    {
        name: 'Feed',
        path: '/feed',
        component: Feed,
        meta: {
            title: 'Feed'
        }
    },
    {
        name: 'Message',
        path: '/message',
        component: Message,
        meta: {
            title: 'Message'
        }
    }, {
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: '404 not found'
        }
    } , {
        name: 'OneMessage',
        path: '/onemessage/:id',
        component: OneMessage,
        meta: {
            title: 'OneMessage'
        }
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach((to) => {
    document.title = to.meta.title // display page meta:title in browser tab
})

export default router