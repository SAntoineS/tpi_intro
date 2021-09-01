<template>
  <div class="flex justify-center items-center text-white relative h-5/6">
    <img alt="" :src="game.background_image" class="w-full h-full absolute opacity-10">
    <div class="flex w-1/2">
      <div class="w-1/2 flex flex-col items-center z-20">
        <div class="flex flex-col">
          <span class="text-5xl font-extrabold">{{ game.name }}</span>
          <a :href="game.website" class="text-gray-500 hover:text-white">by {{ game.publishers[0].name }}</a>
          <span class="text-xs text-gray-500">{{ game.released }}</span>
        </div>
        <div class="my-10 flex space-x-4">
          <div class="flex flex-col items-center">
            <span class="text-xl font-bold">Rating</span>
            <span class="text-gray-500 text-sm"> {{ game.rating }} / {{ game.rating_top }}</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-xl font-bold">Reviews count</span>
            <span class="text-gray-500 text-sm"> {{ game.reviews_count }}</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-xl font-bold">Average playtime</span>
            <span class="text-gray-500 text-sm"> {{ game.playtime }} hours</span>
          </div>
        </div>
        <span class="text-3xl font-extrabold">About</span>
        <p class="text-center text-sm">{{ game.description_raw }}</p>
      </div>
      <div class="w-1/2 flex flex-col items-center z-20">
        <div class="flex flex-wrap justify-center">
          <card-image v-for="(screen, index) in screenshots" :key="screen" :screen="screen" :screenshots="screenshots"
                      :index="index"></card-image>
        </div>
        <span class="text-3xl font-extrabold">50 $</span>
        <div
            class="rounded-xl cursor-pointer flex justify-center items-center w-28 h-16 bg-gray-button hover:bg-white hover:text-black"
            @click="addToCart">
          Add to cart
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import cardImage from "@/gameInfoPage/cardImage";

export default {
  name: "gameInfoPage",
  components: {
    cardImage
  },
  data() {
    return {
      api_key: '9b6fd98a776b4f3d80aed9bf3e825c6d',
      url_base: 'https://api.rawg.io/api',
      game: {},
      screenshots: [],
    }
  },
  mounted() {
    this.getGameInfo()
  },
  methods: {
    addToCart() {
      let order = {name:this.game.slug, price:50};
      this.currentCart.push(order);
      sessionStorage.currentCart = JSON.stringify(this.currentCart);
    },
    getGameInfo() {
      fetch(
          this.url_base + '/games/' + this.$route.params.gameName + '?key=' + this.api_key
      ).then(res => {
        return res.json();
      }).then(this.setResultsGameInfo);
    },
    setResultsGameInfo(results) {
      this.game = results;
      console.log(this.game)
      this.getScreenshots()
    },
    getScreenshots() {
      fetch(
          this.url_base + '/games/' + this.game.id + '/screenshots' + '?key=' + this.api_key
      ).then(res => {
        return res.json();
      }).then(this.setResultsScreenshots);
    },
    setResultsScreenshots(results) {
      this.screenshots = results.results;
      console.log(this.screenshots)
    },
  }
}
</script>

<style scoped>
</style>
