<template>
  <div class="flex flex-col justify-start items-center w-full text-white bg-gray-general">

    <!--      <span class="text-4xl border-b border-gray-300">Most popular games</span>-->

    <div class="flex h-16 w-full">
      <div class="flex justify-center items-center w-1/3">
        TAGS
      </div>
      <div class="flex justify-center items-center w-1/3">
        <input  type="text" placeholder="Search game..."
                                 class="bg-gray-general w-3/12 text-4xl outline-none text-center w-full"
                                 spellcheck="false" v-model="query" @keypress="fetchGame">
        <span v-if="gameSearched.detail" class="text-center text-red-500">{{ gameSearched.detail }}</span>
      </div>
      <div class="flex justify-center items-center w-1/3">
        GENRES
      </div>

    </div>

    <div v-if="!gameSearched.name" class="flex justify-center flex-wrap ">
      <game-card class="m-10 h-1/2" v-for="game in games" :key="game" :game-info="game"></game-card>
    </div>

    <game-card v-if="gameSearched.name" :gameInfo="gameSearched"></game-card>


  </div>
</template>

<script>
import gameCard from "@/mainPage/gameCard";

export default {
  name: "mainPage",
  components: {
    gameCard
  },
  // firebase: {
  //   games: gamesRef
  // },
  data() {
    return {
      // game: {
      //   name: ''
      // },
      // popularGames: [],

      api_key: '9b6fd98a776b4f3d80aed9bf3e825c6d',
      url_base: 'https://api.rawg.io/api',
      query: '',
      gameSearched: {},
      games: []
    }
  },
  methods: {
    // add: function () {
    //   console.log("test")
    //   gamesRef.push(this.game)
    //   this.game.name = '';
    // },
    async fetchGame(e) {
      if (e.key === "Enter") {
        if (this.query){
          this.searchGame();
        }else {
          this.gameSearched = {};
          this.gameSearched.detail = 'Pleas enter a name.'
        }
      }
    },
    searchGame() {
      var nameOfGame = this.query.replace(/\s+/g, '-').toLowerCase();

      fetch(
          this.url_base + '/games/' + nameOfGame + '?key=' + this.api_key
      ).then(res => {
        return res.json();
      }).then(this.setResultsSearchGame);

      //     .then(async function (response) {
      //   var resp = await response.json()
      //   console.log(resp);
      //   if (resp.redirect){
      //     this.wrongName = resp;
      //   }
      // });
    },
    setResultsSearchGame(results) {
      this.gameSearched = results;
      console.log("game: ", this.gameSearched);
      if (this.gameSearched.redirect) {
        fetch(
            this.url_base + '/games/' + this.gameSearched.slug + '?key=' + this.api_key
        ).then(res => {
          return res.json();
        }).then(this.setResultsSearchGame);
      }
    },
    getGames(){
      fetch(
          this.url_base + '/games' + '?key=' + this.api_key
      ).then(res => {
        return res.json();
      }).then(this.setResultsGetGames);
    },
    setResultsGetGames(results){
      this.games = results.results;
      console.log("games: ", this.games);
    }
  },
  mounted() {
    this.getGames()
    // gamesRef.once('value').then(value => {
    //   this.popularGames = value.val();
    // });
  }
}
</script>

<style scoped>

</style>
