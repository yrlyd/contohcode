<template>
<loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  
  <form @submit.prevent="handleSubmit">
    <p class="message">Please note your username and token for your login access!</p>

    <label>username:</label>
    <input type="text" v-model="username" disabled />

    <label>token:</label>
    <input type="text" v-model="token" disabled />

    <div class="submit">
      <button>Register</button>
    </div>
  </form>
</template>

<style scoped>
form {
  max-width: 420px;
  margin: 30px auto;
  background: #181818;
  text-align: left;
  padding: 10px 40px 40px 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  border-bottom: 1px solid #ddd;
  color: #fff;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  margin-top: 30px;
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
.message{
  max-width: 420px;
  margin-top: 30px;
  text-align: center;
}
</style>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import baseService from "../services/index.js";
import apiConfig from "../api/apiConfig.js";
export default {
  data() {
    return {
      isLoading: true,
      fullPage: true,
      email: "",
      username: "",
      token:""
    };
  },
  components:{
    Loading
  },
  methods: {
    getCreds(email) {
      console.log(email);
      this.isLoading = true;
      baseService.post(
        apiConfig.getCredentials,
        {email},
        this.handleSuccess,
        this.handleFailed
      );
    },
    handleSuccess(response) {
      console.log(response);
      const data = response.data;
      this.username = data.data.username;
      this.token = data.data.token;
      console.log(this.username, this.token)
      this.isLoading = false;
    },
    handleFailed(err) {
      console.log(err);
    },
    handleSubmit() {
      this.getCreds(
        this.$route.query.email
      );
    },
    onCancel(){
      console.log("User cancelled the loader.")
    }
  },
  beforeMount(){
    var theEmail = this.$route.query.email;
    this.getCreds(theEmail);
  }
};
</script>

