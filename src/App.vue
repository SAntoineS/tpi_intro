<template>
  <div class="font-body h-screen bg-gray-general">
    <notifications position="bottom right"/>
    <app_nav></app_nav>
    <router-view></router-view>
  </div>
</template>

<script>
import app_nav from "@/app_nav";

export default {
  name: 'App',
  components: {
    app_nav,
  }
}
</script>

<style>

</style>
