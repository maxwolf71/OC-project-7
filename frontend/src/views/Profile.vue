<template>
  <div class="">
    <router-link to="/feed">Go to message feed</router-link> |
    <router-link to="/message">Post a message</router-link>
    
    <div class="card">
      <h1 class="card__title">{{ user.firstName }} {{ user.lastName }}</h1>
      <p>{{ user.bio }}</p>
      <div class="form_row">
        <button @click="logout()" class="button">
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  mounted() {
    if (this.$store.state.user.userId == -1) {
      //if user id -1
      this.$router.push("/"); //go back to login
      return;
    }
    this.$store.dispatch("getUserInfos"); // retrieve user infos
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>
