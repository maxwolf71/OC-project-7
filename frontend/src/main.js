import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(fas)

createApp(App)
    .use(router)
    .use(store)
    .component("fa", FontAwesomeIcon)
    .mount('#app')
