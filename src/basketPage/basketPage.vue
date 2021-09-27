<template>
  <div>
    <div v-if="currentCart" class="flex justify-center items-center text-white h-5/6">
      <div class="flex w-1/2">
        <div class="w-1/2 flex flex-col items-center">

          <span class="text-5xl font-extrabold">Delivery country</span>
          <div class="flex items-center my-5">
            <country-flag :country='country' size='normal'/>
            <country-select class="appearance-none p-2 rounded text-black focus:outline-none w-52" v-model="country"
                            :country="country" topCountry="US"/>
          </div>
          <span class="text-4xl font-extrabold">Promo / student code</span>
          <input class="p-2 rounded w-52 my-5 text-black focus:outline-none">
          <span class="text-4xl font-extrabold">Email address</span>
          <input type="email" class="p-2 rounded w-52 my-5 text-black focus:outline-none">
          <span class="text-4xl font-extrabold">Delivery address</span>
          Adress:
          <input class="p-2 rounded w-52 my-5 text-black focus:outline-none">
          Zip:
          <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                 class="p-2 rounded w-52 my-5 text-black focus:outline-none">
        </div>
        <div class="w-1/2 flex flex-col items-center">
          <div class="flex">
            <span class="border-b-2 text-5xl font-extrabold">{{ currentCart.length }} items</span>
            <div
                class="select-none rounded-xl cursor-pointer flex justify-center items-center ml-5 w-28 h-16 bg-gray-button hover:bg-white hover:text-black"
                @click="deleteCart">
              Delete
            </div>
          </div>

          <div class="flex flex-col w-full h-96 overflow-auto	border-b-2">
            <div v-for="item in currentCart" :key="item" class="flex p-5">
              <img :src="item.img" class="w-52" alt="">
              <div class="flex flex-col justify-center text-sm">
                <span class="m-2">Price: <span class="font-extrabold">{{ item.price }} $</span></span>
                <span class="m-2">Game: <span class="font-extrabold">{{ item.name }} </span></span>
                <span class="m-2">
                  Qty:
                  <span class="font-extrabold">{{ item.count }} -</span>
                </span>
              </div>
            </div>
          </div>

          <span class="text-5xl my-2">Total: <span class="font-extrabold">{{ subtotal }} $</span></span>
          <div
              class="select-none rounded-xl cursor-pointer flex justify-center items-center w-28 h-16 bg-gray-button hover:bg-white hover:text-black"
              @click="showModal=true">
            Pay now
          </div>
          <Modal v-model="showModal" title="Payment Information">
            <div class="flex flex-col">
              <form
                  id="app"
                  @submit="checkForm">
                <div class="flex justify-center items-center space-x-4">
                  <font-awesome-icon class="text-3xl" :icon="['fab', 'cc-visa']"/>
                  <font-awesome-icon class="text-3xl" :icon="['fab', 'cc-paypal']"/>
                  <font-awesome-icon class="text-3xl" :icon="['fab', 'cc-mastercard']"/>
                </div>
                <span class="text-4xl font-extrabold">Credit card number</span>
                <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="creditCardNumber" class="p-2 rounded  my-5 text-black border-2 border-black">
                <div class="flex justify-between space-x-4">
                  <div class="flex justify-center w-1/2">
                    <span class="text-4xl font-extrabold">Exp. Date</span>
                  </div>
                  <div class="flex justify-center w-1/2">
                    <span class="text-center text-4xl font-extrabold">CvC</span>
                  </div>
                </div>
                <div class="flex justify-between space-x-4">
                  <input v-model="expDate" type="month" class="p-2 rounded  my-5 text-black border-2 border-black">
                  <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="cvc" class="p-2 rounded  my-5 text-black border-2 border-black">
                </div>
                <div class="flex justify-center items-center">
                  <input type="submit" value="Confirm"
                         class="p-2 focus-outline:none text-white select-none rounded-xl cursor-pointer flex justify-center items-center bg-gray-button">
                </div>
              </form>
              <div v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </div>
            </div>
          </Modal>

        </div>
      </div>
    </div>
    <div v-if="!currentCart" class="flex flex-col justify-center items-center text-white h-5/6">
      <span class="text-5xl font-extrabold">No items.</span>
      <a href="/"
         class="select-none rounded-xl cursor-pointer flex justify-center items-center m-5 w-28 h-16 bg-gray-button hover:bg-white hover:text-black">
        Go to shop
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "basketPage",
  data() {
    return {
      country: '',
      region: '',
      currentCart: undefined,
      subtotal: 0,
      showModal: false,

      errors: [],
      creditCardNumber: null,
      expDate: null,
      cvc: null
    }
  },
  mounted() {
    this.currentCart = JSON.parse(sessionStorage.currentCart);
    console.log(this.currentCart)
    this.currentCart.forEach(element => {
      this.subtotal += element.price * element.count;
    })
  },
  methods: {
    deleteCart() {
      sessionStorage.removeItem('currentCart');
      location.reload();
    },
    async checkForm(e) {
      let index = undefined;
      if (this.creditCardNumber && this.cvc && this.expDate) {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Payment confirmed  !'
        });
        await delay(5000)
        return true;
      }

      this.errors = [];

      if (!this.creditCardNumber) {
        this.errors.push('CreditCard required.');
      }else {
        index = this.errors.indexOf('CreditCard required.');
        this.errors.splice(index, 1);
      }

      if (!this.cvc) {
        this.errors.push('CvC required.');
      }else {
        index = this.errors.indexOf('CvC required.');
        this.errors.splice(index, 1);
      }

      if (!this.expDate) {
        this.errors.push('Expiration date required.');
      }else {
        index = this.errors.indexOf('Expiration date required.');
        this.errors.splice(index, 1);
      }

      e.preventDefault();
    },
  }
}
</script>

<style scoped>

</style>
