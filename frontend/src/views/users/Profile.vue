<template>
  <div>
    <Nav title="My Profile" />
    <div class="card">
      <h1 class="card__title">{{ user.firstName }} {{ user.lastName }}</h1>
      <h3 class="card__subtitle">Bio :</h3>
      
      <!--<router-link <:to="{ name: 'Bio', params: { id: this.$store.state.user.userId }}"> MODIFY BIO, to implement if time left -->
        <p class="bio">{{ user.bio }}</p>
      <!--</router-link>-->

      <div class="form_row">
        <button @click="logout" class="button">Sign out</button>
      </div>
      <div class="form_row" v-if="user.id !== this.$store.state.user.userId || this.$store.state.user.isAdmin == true">
        <button @click="logout" class="button">Delete account (Admin only !)</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import Nav from "@/components/Nav"

export default {
  name: "Profile",
  components: { Nav },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      //if user doesn't exist
      this.$router.push("/") //go back to login
      return
    }
    this.$store.dispatch("getUserInfos") // retrieve user infos
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout() {
      this.$store.commit("logout")
      this.$router.push("/")
    },
  },
}
</script>
      