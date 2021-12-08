<template>
  <div class="loginCard">
    <h1 class="loginCard__title" v-if="mode == 'login'">Sign in</h1>
    <h1 class="loginCard__title" v-else>Sign up</h1>
    <p class="loginCard__subtitle" v-if="mode == 'login'">
      Don't have an account yet ?
      <span class="loginCard__action" @click="switchToCreateAccount()">Create one</span>
    </p>
    <p class="loginCard__subtitle" v-else>
      Already have an account ?<br>
      <span class="loginCard__action" @click="switchToLogin()">Sign in</span>
    </p>
    <div>
      <input v-model="email" class="loginCard__input" type="text" placeholder="Email Address"/>
    </div>
    <div v-if="mode == 'create'">
      <input v-model="firstName" class="loginCard__input" type="text" placeholder="First name"/><br>
      <input v-model="lastName" class="loginCard__input" type="text" placeholder="Last name"/>
    </div>
    <div>
      <input v-model="password" class="loginCard__input" type="password" placeholder="Password"/>
    </div>
    <div v-if="mode == 'create'">
      <input v-model="bio" class="loginCard__input" type="Bio" placeholder="Enter a short bio (optional)"/>
    </div>
    <div class="loginCard__title" v-if="mode == 'login' && status == 'error_login'">
      Wrong email and/or password !
    </div>
    <div class="loginCard__title" v-if="mode == 'create' && status == 'error_create'">
      Email address already used !
    </div>
    <div>
      <button @click="login()" class="button" :class="{ 'button--disabled': !validatedFields }" 
      v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connecting...</span>
        <span v-else>Sign in</span>
      </button>
      <button @click="createAccount()" class="button" :class="{ 'button--disabled': !validatedFields }" 
      v-else>
        <span v-if="status == 'loading'">Creating account...</span>
        <span v-else>Create account</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "Login",
  data() {
    return {
      mode: "login",
      email: "",
      password: "",
    }
  },
  mounted() {
    if (this.$store.state.user.userId != -1) {
      // if the id exists
      this.$router.push("/")
      return
    }
  },
  computed: {
    validatedFields() {
      if (this.mode == "create") {
        // if create
        if (
          this.email != "" &&
          this.firstName != "" &&
          this.lastName != "" &&
          this.password != ""
        ) {
          return true
        } else {
          return false
        }
      } else {
        // if login
        if (this.email != "" && this.password != "") {
          return true
        } else {
          return false
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount() {
      this.mode = "create"
    },
    switchToLogin() {
      this.mode = "login"
    },
    login() {
      const self = this
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(function () {
          self.$router.push("/profile")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createAccount() {
      const self = this
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          bio: this.bio,
        })
        .then(function () {
          self.login()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.loginCard {
    text-align: center;
    max-width: 100%;
    width: 540px;
    background: $blue;
    border-radius: 16px;
    padding: 10px;
    border: 4px solid #fff;
    margin: 150px auto;

  &__title {
    color: $white;
  }
  &__subtitle {
    color: $white;
    font-size: 30px;
    line-height: 2;
  }
  &__action {
    background-color: $lightRed;
    color: $blue;
    border-radius: 15px;
    padding: 0 5px;
  }
  &__action:hover {
    cursor: pointer;
  }
  &__input {
    font-size: 1rem;
    line-height: 2;
    margin: 5px;
  }
}
</style>
