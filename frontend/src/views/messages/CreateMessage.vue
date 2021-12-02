<template>
  <div>
    <Nav />
    <div class="createMessageCard">
      <form class="formCreate" @submit.prevent="createMessage">
        <div class="createMessageCard__title">
          <label for="title">Title : </label><br />
          <input
            name="title"
            class="titleInput"
            placeholder="Message title here"
            v-model="title"
          /><br />
        </div>

        <div class="createMessageCard__messageContent">
          <label for="content">Message :</label><br />
          <textarea
            name="messageContent"
            class="messageContentInput"
            placeholder="Message content here"
            v-model="content"
          ></textarea>
          <br />
        </div>
        <div class="attachmentcreateMessageCard">
          <label for="attachment">
            Select Image :
            <input type="file" name="attachment" /> <br />
          </label>
        </div>
        <button class="button" type="submit">Post message</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "@/components/Nav";

export default {
  name: "Message",
  components: { Nav },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      // if userId doesn't exist
      this.$router.push("/"); //go back to login
      return;
    }
  },
  methods: {
    createMessage() {
      const formCreate = document.getElementsByClassName("formCreate")[0];
      let data = new FormData(formCreate);
      const token = this.$store.state.user.token;

      if (this.title == "" || this.content == "") {
        alert("Please fill in both fields !");
      } else {
        axios
          .post("http://localhost:3000/api/messages/new", data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res) {
              this.$router.push("/feed"); //go to message feed
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.createMessageCard {
  text-align: center;
  width: 70%;
  background: $blue;
  border-radius: 16px;
  padding: 20px;
  border: 4px solid #fff;
  margin: 150px auto;
  
  @media (min-width: 1024px) {
    width: 30%;
  }

  &__title {
    color: $white;
    font-size: 25px;

    .titleInput {
      margin-bottom: 20px;
      line-height: 2;
      font-size: 1rem;
    }
  }
  &__messageContent {
    color: $white;
    font-size: 20px;

    .messageContentInput {
      width: 80%;
      margin: 10px auto;
      font-size: 1.5rem;
    }
  }
  .attachmentcreateMessageCard {
    label {
      color: $white;

      input {
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        background-color: $lightRed;
        color: $blue;
      }
    }
  }
  .button {
    margin: 30px 10px auto;
    width: 40%;
  }
}
</style>
