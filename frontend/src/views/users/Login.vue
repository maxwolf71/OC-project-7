<template>
  <div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Sign in</h1>
    <h1 class="card__title" v-else>Sign up</h1>
    <p class="card__subtitle" v-if="mode == 'login'">
      Don't have an account yet ?
      <span class="card__action" @click="switchToCreateAccount()"
        >Create one</span
      >
    </p>
    <p class="card__subtitle" v-else>
      Already have an account ?
      <span class="card__action" @click="switchToLogin()">Sign in</span>
    </p>
    <div class="form-row">
      <input
        v-model="email"
        class="form-row__input"
        type="text"
        placeholder="Email Address"
      />
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input
        v-model="firstName"
        class="form-row__input"
        type="text"
        placeholder="First name"
      />
      <input
        v-model="lastName"
        class="form-row__input"
        type="text"
        placeholder="Last name"
      />
    </div>
    <div class="form_row">
      <input
        v-model="password"
        class="form-row__input"
        type="password"
        placeholder="Password"
      />
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input
        v-model="bio"
        class="form-row__input"
        type="Bio"
        placeholder="Enter a short bio (optional)"
      />
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Wrong email and/or password !
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Email address already used !
    </div>
    <div class="form-row">
      <button
        @click="login()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'">Connecting...</span>
        <span v-else>Sign in</span>
      </button>
      <button
        @click="createAccount()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-else
      >
        <span v-if="status == 'loading'">Creating account...</span>
        <span v-else>Create account</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      mode: "login",
      email: "",
      password: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId != -1) {
      // if the id exists
      this.$router.push("/");
      return;
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
          return true;
        } else {
          return false;
        }
      } else {
        // if login
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount() {
      this.mode = "create";
    },
    switchToLogin() {
      this.mode = "login";
    },
    login() {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(function () {
          self.$router.push("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createAccount() {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          bio: this.bio,
        })
        .then(function () {
          self.login();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/main.scss";

.card {
  text-align: center;
  max-width: 100%;
  width: 540px;
  background: #fd2d01;
  border-radius: 16px;
  padding: 10px;
  border: 4px solid #fff;
  margin: 50px auto;

  &__title {
    font-weight: 800;
    color: $white;
  }
  &__subtitle {
    color: white;
    font-weight: 500;
    font-size: 30px;
  }
  &__action {
    color: #fff;
  }
  &__action:hover {
    cursor: pointer;
  }
} 

</style>
