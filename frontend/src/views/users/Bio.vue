<template>
  <div class="editBioCard">
    <form class="formCreate" @submit.prevent="editBio">
      <label for="bio"></label>
      <textarea
        name="bio"
        class="editBioCard__content"
        placeholder="New bio here"
        v-model="bio"
      ></textarea>
      <br />
      <button class="button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Bio",
  data() {
    return {
      bio: "",
    };
  },
  methods: {
    editBio() {
      const formCreate = document.getElementsByClassName("formCreate")[0];
      let data = new FormData(formCreate);

      const userId = this.$store.state.user.userId;
      const token = this.$store.state.user.token;

      axios
        .put(`http://localhost:3000/api/users/bio/${userId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          bio: this.bio,
        })
        .then((res) => (this.bio = res.data))
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.editBioCard {
  text-align: center;
  width: 70%;
  background: $blue;
  border-radius: 16px;
  padding: 20px;
  border: 4px solid #fff;
  margin: 150px auto;

  .button {
    margin: 30px 10px auto;
    width: 40%;
  }
}
</style>