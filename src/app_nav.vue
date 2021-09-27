<template>
  <div class="flex justify-center h-40 text-white bg-gray-general">

    <div class="flex flex-col justify-end">
      <a href="/" class="text-2xl font-extrabold focus:outline-none">ShopGames</a>
      <span class="text-xs text-gray-500">online video games shop</span>
      <div class="h-12">

      </div>
    </div>

    <div class="flex flex-col justify-center items-center w-1/3">

    </div>

    <div class="flex justify-end items-center">
      <a v-if="this.$auth.isAuthenticated" href="/account" class="text-gray-500 hover:text-white focus:outline-none">My
        Account</a>
      <a href="/basket" v-if="this.$auth.isAuthenticated" class="text-gray-500 hover:text-white ml-5 focus:outline-none">Basket</a>
      <div class="ml-5 flex" v-if="!this.$auth.loading">
        <!-- show login when not authenticated -->
        <a v-if="!this.$auth.isAuthenticated" @click="login" class="cursor-pointer"><strong>Sign in</strong></a>
        <!-- show logout when authenticated -->
        <h3 v-if="this.$auth.isAuthenticated" class="is-size-3 has-background-dark welcome">Welcome, {{ $auth.user.name }}!</h3>
        <font-awesome-icon class="ml-5 text-2xl cursor-pointer" v-if="this.$auth.isAuthenticated" @click="logout" :icon="['fa', 'sign-out-alt']"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "app_nav",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
      this.$notify({
        type: 'success',
        title: 'Success',
        text: 'Disconnected !'
      });
    }
  }
}
</script>

<style scoped>

</style>
