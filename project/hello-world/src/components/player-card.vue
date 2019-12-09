
<template lang="pug">
article.card
  h2.card-title
    router-link(:to="playerUrl")  {{ player.name }}
  p Hosted sessions: {{ player.hostedSessions.length }}
  p Visited sessions: {{ player.visitedSessions.length }}
</template>

<script>

export default {
  name: 'PlayerCard',
  props: ['player'],
  computed: {
    playerUrl() {
      return `/player/${this.player._id}`
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