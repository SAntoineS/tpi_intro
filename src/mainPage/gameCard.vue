<template>
  <div v-if="gameInfo.name" id="card" class="text-white flex flex-col items-center bg-gray-card rounded-3xl">
    <div>
      <img class="rounded-t-3xl" :src="gameInfo.background_image" alt="">
    </div>

    <div class="w-full p-5">
      <div class="flex space-x-4 text-lg">
        <font-awesome-icon v-if="platformsOfTheGames.includes('Linux')" :icon="['fab', 'linux']"/>
        <font-awesome-icon v-if="platformsOfTheGames.includes('PC')" :icon="['fab', 'windows']"/>
        <font-awesome-icon v-if="platformsOfTheGames.includes('macOS')" :icon="['fab', 'apple']"/>
        <font-awesome-icon v-if="platformsOfTheGames.includes('PlayStation 3') || platformsOfTheGames.includes('PlayStation 4') || platformsOfTheGames.includes('PlayStation 5')" :icon="['fab', 'playstation']"/>
        <font-awesome-icon v-if="platformsOfTheGames.includes('Xbox 360') || platformsOfTheGames.includes('Xbox One') ||platformsOfTheGames.includes('Xbox Series S/X')" :icon="['fab', 'xbox']"/>
        <font-awesome-icon v-if="platformsOfTheGames.includes('Android')" :icon="['fab', 'android']"/>
      </div>
      <div class="flex items-center text-3xl mt-2 font-extrabold">
        <a :href="'/game/' + gameInfo.slug" class="hover:text-gray-500 focus:outline-none">{{gameInfo.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gameCard",
  props: ['gameInfo'],
  data() {
    return {
      platformsOfTheGames: []
    }
  },
  methods: {
    getPlatforms(){
      var platforms = [];
      // console.log("TAGS: ", this.gameInfo.tags)
      this.gameInfo.platforms.forEach(function(item){
        platforms.push(item.platform.name.toString())
      });
      this.platformsOfTheGames = platforms;
    }
  },
  mounted() {
    this.getPlatforms()
  }
}
</script>

<style scoped>
#card{
  width: 365px;
}
</style>
