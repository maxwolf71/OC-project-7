<template>
    <div class="card">
        <h1 class="card__title">My space</h1>
        <p class="card__subtitle">Here's my story...</p>
        <p>{{ user.first_name }} {{ user.last_name }} {{ user.email }}</p>
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