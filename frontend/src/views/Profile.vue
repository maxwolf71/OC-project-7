<template>
    <div class="card">
        <h1 class="card__title">{{ user.firstName }} {{ user.lastName }}</h1>
        <p class="card__subtitle">Here's my latest post : <span class="bio">{{ user.bio }}</span></p>
        <img :src="user.photo"/>
        <div class="form_row">
            <button @click="logout()" class="button">
                Sign out
            </button>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Profile',
    mounted() {
        console.log(this.$store.state.user)
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/')
            return
        }
        this.$store.dispatch('getUserInfos')
    },
    computed: {
        ...mapState({
            user: 'userInfos'
        })
    },
    methods: {
        logout() {
            this.$store.commit('logout')
            this.$router.push('/')
        }
    }
}
</script>