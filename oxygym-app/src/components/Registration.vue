<template>
  <form @submit.prevent="handleSubmit">
    <label>Name:</label>
    <input type="text" v-model="name" required />

    <label>Id Number (KTP):</label>
    <input type="text" v-model="idNumber" required />

    <label>Date of Birth:</label>
    <input type="date" v-model="dateOfBirth" required />

    <label>Address:</label>
    <input type="text" v-model="address" required />

    <label>Phone Number:</label>
    <input type="tel" v-model="phone" required />

    <label>Email:</label>
    <input type="email" v-model="email" required />

    <label>Social Media:</label>
    <input type="text" v-model="socialMedia" />

    <label>Urgency Contact (Name):</label>
    <input type="text" v-model="urgencyName" required />

    <label>Urgency Contact (Number):</label>
    <input type="tel" v-model="urgencyPhone" required />

    <div class="submit">
      <button>Register</button>
    </div>
  </form>
</template>

<style>
@media (prefers-color-scheme: dark){
  form{
    background:#fff;
  }
  label {
  color: #181818;
  }
  input,
  select {
    color: #181818;
    border-bottom: 1px solid #1f1e1e;
  }
}
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
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
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
</style>

<script>
import baseService from "../services/index.js";
import apiConfig from "../api/apiConfig.js";
export default {
  data() {
    return {
      name: "",
      barcode: "",
      idNumber: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      email: "",
      socialMedia: "",
      urgencyName: "",
      urgencyPhone: "",
    };
  },
  mounted(){
    console.log(window.location.origin);
    this.barcode = this.$route.query.barcode;
    console.log(this.barcode);
  },
  methods: {
    register(
      name,
      barcode,
      idNumber,
      dateOfBirth,
      address,
      phone,
      email,
      socialMedia,
      urgencyName,
      urgencyPhone
    ) {
      baseService.post(
        apiConfig.register,
        {
          name,
          barcode,
          idNumber,
          dateOfBirth,
          address,
          phone,
          email,
          socialMedia,
          urgencyName,
          urgencyPhone,
        },
        this.handleSuccess,
        this.handleFailed
      ).then(()=>{
        this.$router.push("/registered?email="+this.email);
      });
    },
    handleSuccess(response) {
      console.log(response);
    },
    handleFailed(err) {
      console.log(err);
    },
    handleSubmit() {
      console.log('aaa');
      this.register(
        this.name,
        this.barcode,
        this.idNumber,
        this.dateOfBirth,
        this.address,
        this.phone,
        this.email,
        this.socialMedia,
        this.urgencyName,
        this.urgencyPhone
      );
    },
  },
};
</script>

