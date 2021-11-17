<template>
  <div>
    <Nav />
    <div class="card">
      <h1 class="card__title">{{ user.firstName }} {{ user.lastName }}</h1>
      <h3 class="card__subtitle">Bio :</h3>
      
      <!--<router-link <:to="{ name: 'Bio', params: { id: this.$store.state.user.userId }}"> MODIFY BIO, to implement if time left -->
        <p class="bio">{{ user.bio }}</p>
      <!--</router-link>-->

      <div>
        <button @click="logout" class="button">Sign out</button>
      </div>
      <div v-if="user.id !== this.$store.state.user.userId || this.$store.state.user.isAdmin == true">
        <button @click="logout" class="delAccount">Delete account (Not reversable !)</button>
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

<style lang="scss" scoped>
@import "src/assets/styles/main.scss";

.card {
  text-align: center;
  max-width: 100%;
  width: 540px;
  background: $mainRed;
  border-radius: 16px;
  padding: 10px;
  border: 4px solid #fff;
  margin: 250px auto;

  &__title {
    font-weight: 800;
    color: #fff;
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
  & .delAccount {
    color: red;
  }
  .bio {
  font-weight: bold;
  padding: 20px 0;
  border: 2px solid whitesmoke;
  margin: 20px;
  color: white;
  border-radius: 16px;
  }
}
</style>
      