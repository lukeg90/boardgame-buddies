<template lang="pug">
article.card
  game-image(:session="session")
  h2.card-title 
    router-link(:to="sessionUrl") {{ session.game.name }} 
  p {{ moment(session.datetime).format('MMMM Do YYYY, h:mm a') }}
  p(v-if="session.players.length == session.game.maxPlayers" style="color: red") Session full
</template>

<script>

import GameImage from './game-image.vue'

export default {
  name: 'SessionCard',
  components: {
    GameImage
  },
  props: ['session'],
  computed: {
    sessionUrl() {
      return `/session/${this.session._id}`
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 20px;
  min-width: 200px;
}

</style>