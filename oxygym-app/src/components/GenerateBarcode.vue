<template>
  <form @submit.prevent="handleSubmit">
    <div class="submit">
      <button>Generate Barcode</button>
    </div>
    <div class="barcode" v-if="isGenerated">
      <qrcode-vue :value="value" :size="250" level="L" foreground="#fff" background="#000"/>
      <label>{{value}}</label>
    </div>
  </form>
  
</template>

<style>
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
  /* display: inline-block; */
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
.barcode{
  margin-top: 30px;
  text-align: center;
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
import QrcodeVue from 'qrcode.vue';
import { uuid } from 'vue-uuid';
export default {
  data() {
    return {
      barcode: "",
      value: "",
      isGenerated: false,
    };
  },
  components:{
    QrcodeVue
  },
  methods: {
    generateBarcode(barcode) {
      baseService.post(
        apiConfig.generateBarcode,
        {
          barcode
        },
        this.handleSuccess,
        this.handleFailed
      ).then(()=>{
        this.isGenerated = true;
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
      this.barcode = uuid.v1();
      this.value = window.location.origin+'/registration?barcode='+this.barcode;
      this.generateBarcode(this.barcode);
    },
  },
};
</script>

