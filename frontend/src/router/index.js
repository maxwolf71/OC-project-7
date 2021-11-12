import { createRouter, createWebHistory } from "vue-router"

// Users imports
import Login from '../views/users/Login.vue'
import Profile from '../views/users/Profile.vue'
import Bio from '../views/users/Bio.vue'

// Messages imports
import Feed from '../views/messages/Feed.vue' // display all messages
import CreateMessage from '../views/messages/CreateMessage.vue' // post a message
import OneMessage from '../views/messages/OneMessage.vue' // show single message

import NotFound from '../views/NotFound.vue'

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
        name: 'CreateMessage',
        path: '/createmessage',
        component: CreateMessage,
        meta: {
            title: 'CreateMessage'
        }
    },
    {
        name: 'OneMessage',
        path: '/onemessage/:id',
        component: OneMessage,
        meta: {
            title: 'OneMessage'
        }
    },
    {
        name: 'Bio',
        path: '/bio/:id',
        component: Bio,
        meta: {
            title: 'Bio'
        }
    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: '404 not found'
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