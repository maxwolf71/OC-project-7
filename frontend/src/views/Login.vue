<template>
    <div class="card">
        <h1 class="card__title" v-if="mode == 'login'">Sign in</h1>
        <h1 class="card__title" v-else>Register</h1>
        <p class="card__subtitle" v-if="mode == 'login'">Don't have an account yet ? <span class="card__action" @click="switchToCreateAccount()">Create one</span></p>
        <p class="card__subtitle" v-else>Already have an account ? <span class="card__action" @click="switchToLogin()">Sign in</span></p>
        <div class="form-row">
            <input v-model="email" class="form-row__input" type="text" placeholder="Email Address">
        </div>
        <div class="form-row" v-if="mode == 'create'">
            <input v-model="first_name" class="form-row__input" type="text" placeholder="First name">
            <input v-model="last_name" class="form-row__input" type="text" placeholder="Last name">
        </div>
        <div class="form_row">
            <input v-model="password" class="form-row__input" type="password" placeholder="Password">
        </div>
        <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
            Email address already used !
        </div>
        <div class="form-row">
            <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
                <span v-if="status == 'loading'">Connecting...</span>
                <span v-else>Sign in</span>
            </button>
            <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
                <span v-if="status == 'loading'">Creating account...</span>
                <span v-else>Create account</span>
            </button>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            mode: 'login',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
        }
    },
    mounted() {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/profile')
            return
        }
    },
    computed: {
        validatedFields() {
            if (this.mode ==  'create') {
                if (this.email != '' && this.first_name != '' && this.last_name != '' && this.password != '') {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.email != '' && this.password != '') {
                    return true
                } else {
                    return false
                }
            }
        },
        ...mapState(['status'])
    },
    methods: {
        switchToCreateAccount() {
            this.mode = 'create'
        }, 
        switchToLogin() {
            this.mode = 'login'
        },
        login() {
            const self = this
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }).then(function () {
                self.$router.push('/profile')
            }). catch(function (error) {
                console.log(error)
            })
        },
        createAccount() {
            const self = this
            this.$store.dispatch('createAccount', {
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                password: this.password
            }).then(function () {
                self.login()
            }). catch(function (error) {
                console.log(error)
            })
        },
    }
}
</script>