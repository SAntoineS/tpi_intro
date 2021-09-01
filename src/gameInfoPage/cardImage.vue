<template>
  <div>
    <img class="w-48 rounded-3xl p-5 cursor-pointer" :src="screen.image" alt="" @click="show()">

    <!-- all props & events -->
    <vue-easy-lightbox
        escDisabled
        moveDisabled
        :visible="visible"
        :imgs="allScreenshotsUrl"
        :index="index"
        @hide="handleHide">
    </vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  name: "cardImage",
  props: ['screen', 'screenshots', 'index'],
  components: {
    VueEasyLightbox
  },
  mounted() {
    this.screenshots.forEach(screen => {
      this.allScreenshotsUrl.push(screen.image);
    })
  },
  data() {
    return {
      visible: false,
      allScreenshotsUrl: []
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
