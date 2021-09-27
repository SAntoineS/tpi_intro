<template>
  <div class="flex flex-col justify-start items-center w-full text-white bg-gray-general">

    <div class="flex h-16 w-full">
      <div class="flex flex-col justify-center items-center w-1/3">
        <span class="text-2xl font-extrabold">Tags</span>
        <div class="flex flex-wrap space-x-2 justify-center items-center mt-5">
          <Dropdown
              :options="tags"
              v-on:selected="filterByTag"
              :disabled="false"
              name="tag"
              placeholder="Please select an option">
          </Dropdown>
        </div>
      </div>

      <div class="flex justify-center items-center w-1/3">
        <input type="text" placeholder="Search game..."
               class="bg-gray-general w-3/12 text-4xl outline-none text-center w-full"
               spellcheck="false" v-model="query" @keypress="fetchGame">
        <span v-if="gameSearched.detail" class="text-center text-red-500">{{ gameSearched.detail }}</span>
      </div>

      <div class="flex flex-col justify-center items-center w-1/3">

        <span class="text-2xl font-extrabold">Genres</span>
        <div class="flex flex-wrap space-x-2 justify-center items-center mt-5">
            <Dropdown
              :options="genres"
              v-on:selected="filterByGenre"
              :disabled="false"
              name="genre"
              placeholder="Please select an option">
          </Dropdown>
        </div>
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
import Dropdown from 'vue-simple-search-dropdown';

export default {
  name: "mainPage",
  components: {
    gameCard,
    Dropdown
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
      games: [],
      tags: [],
      genres: [],
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
        if (this.query) {
          this.searchGame();
        } else {
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
    },
    setResultsSearchGame(results) {
      this.gameSearched = results;
      if (this.gameSearched.redirect) {
        fetch(
            this.url_base + '/games/' + this.gameSearched.slug + '?key=' + this.api_key
        ).then(res => {
          return res.json();
        }).then(this.setResultsSearchGame);
      }
    },

    getGames() {
      fetch(
          this.url_base + '/games' + '?key=' + this.api_key
      ).then(res => {
        return res.json();
      }).then(this.setResultsGetGames);
    },
    setResultsGetGames(results) {
      this.games = results.results;
    },

    getAllTags() {
      fetch(
          this.url_base + '/tags' + '?key=' + this.api_key
      ).then(res => {
        return res.json();
      }).then(this.setResultsGetAllTags);
    },
    setResultsGetAllTags(results) {
      results.results.forEach(element => {
        this.tags.push({id: element.id, name: element.name, slug: element.slug})
      })
    },

    getAllGenres() {
      fetch(
          this.url_base + '/genres' + '?key=' + this.api_key
      ).then(res => {
        return res.json();
      }).then(this.setResultsGetAllGenres);
    },
    setResultsGetAllGenres(results) {
      results.results.forEach(element => {
        this.genres.push({id: element.id, name: element.name, slug: element.slug})
      })
    },

    filterByTag(e) {
      console.log(e)

      if (e.name) {
        fetch(
            this.url_base + '/games' + '?key=' + this.api_key + '&tags=' + e.slug
        ).then(res => {
          return res.json();
        }).then(this.setResultFilterByTags);
      }
    },
    setResultFilterByTags(results) {
      this.games = results.results;
    },

    filterByGenre(e) {
      console.log(e)

      if (e.name) {
        fetch(
            this.url_base + '/games' + '?key=' + this.api_key + '&genres=' + e.slug
        ).then(res => {
          return res.json();
        }).then(this.setResultFilterByGenres);
      }
    },
    setResultFilterByGenres(results) {
      this.games = results.results;
    },
  },
  mounted() {
    this.getGames()
    this.getAllTags()
    this.getAllGenres()
    // gamesRef.once('value').then(value => {
    //   this.popularGames = value.val();
    // });
  }
}
</script>

<style scoped>

</style>
