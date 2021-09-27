<template>
  <div class="flex justify-center items-center text-white relative h-5/6">
    <div class="flex flex-col mb-44">
      <div class="flex  items-center">
        <img :src="this.$auth.user.picture" alt="" class="rounded-full w-24 m-5">
        <div class="flex flex-col w-96">
          <input id="nameInput" class="focus:outline-none bg-transparent text-5xl font-extrabold"
                 :value="this.$auth.user.nickname">
          <input id="emailInput" class="focus:outline-none text-gray-500 bg-transparent text-2xl font-extrabold"
                 :value="this.$auth.user.email">
          <span class="text-gray-500 text-sm">Last update: {{ this.$auth.user.updated_at }}</span>
        </div>
      </div>
      <div class="flex items-center">
        <button
            class="select-none rounded-xl cursor-pointer flex justify-center items-center ml-5 p-2 bg-gray-button hover:bg-white hover:text-black"
            @click="saveNewChange">
          Save
        </button>
        <a href="/"
            class="select-none rounded-xl cursor-pointer flex justify-center items-center ml-5 p-2 bg-gray-button hover:bg-white hover:text-black">
          Cancel
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountPage",
  data() {
    return { }
  },
  mounted() {
    console.log(document.getElementById('nameInput').value)
    console.log(this.$auth.user)
    this.patchUserInfo();
  },
  methods: {
    saveNewChange() {
      this.$notify({
        type: 'error',
        title: 'Error',
        text: 'Not implemented !'
      });
    },
    patchUserInfo(){

    },
    setResultsPatchUserInfo(results){
      console.log(results.results);
    },
  }
}
</script>

<style scoped>

</style>
