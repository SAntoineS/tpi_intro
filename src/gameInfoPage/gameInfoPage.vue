<template>
  <div class="flex justify-center items-center text-white relative h-5/6">
    <img alt="" :src="game.background_image" class="w-full h-full absolute opacity-10">
    <div class="flex w-1/2">
      <div class="w-1/2 flex flex-col items-center z-20">
        <div class="flex flex-col w-96 flex-wrap">
          <a :href="game.website" target="_blank" class="hover:text-white text-sm text-gray-500">view site</a><span
            class="text-5xl font-extrabold">{{ game.name }} </span>
          <span v-for="publisher in game.publishers" :key="publisher" class="text-gray-500"> {{
              publisher.name
            }} </span>
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
        <span class="text-3xl font-extrabold">{{ price }} $</span>
        <div
            class="select-none rounded-xl cursor-pointer flex justify-center items-center w-28 h-16 bg-gray-button hover:bg-white hover:text-black"
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
      alreadyIn: false,

      price: 0
    }
  },
  mounted() {
    this.getGameInfo()
    this.price = this.randomIntFromInterval(15, 50)
  },
  methods: {
    randomIntFromInterval(min, max) { // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    addToCart() {
      if (!this.$auth.isAuthenticated) {
        this.$notify({
          type: 'warn',
          title: 'Warning',
          text: 'Sign in to add items in basket !'
        });
      } else {
        let currentCart = []
        let order = {
          slug: this.game.slug,
          price: this.price,
          count: 1,
          img: this.game.background_image,
          name: this.game.name
        };

        if (sessionStorage.currentCart) {
          currentCart = JSON.parse(sessionStorage.currentCart);

          currentCart.forEach(element => {
            if (element.slug === order.slug) {
              element.count++;
              sessionStorage.currentCart = JSON.stringify(currentCart);
              this.alreadyIn = true;
            }
          })
          if (!this.alreadyIn) {
            console.log('Here push1')
            currentCart.push(order);
            sessionStorage.currentCart = JSON.stringify(currentCart);
            console.log("AfterChecking: ", currentCart)
          }

        } else {
          console.log("Here push2")
          currentCart.push(order);
          sessionStorage.currentCart = JSON.stringify(currentCart);
        }
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Added to basket !'
        });
      }

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
      document.title = this.game.name
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
