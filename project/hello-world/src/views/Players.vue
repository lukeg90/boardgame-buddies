<script>
// @ is an alias to /src
import PlayerCard from '@/components/player-card.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Players',
  components: {
    PlayerCard
  },
  computed: {
    ...mapState(['players'])
  },
  methods: {
    ...mapActions(['fetchPlayers'])
  },
  created() {
    this.fetchPlayers()
  }
}
</script>

<template lang="pug">
  main
    h1 Players
    player-card(v-for="player in players", :player="player")
</template>

<style scoped>
main {
    text-align: left;
}
h1 {
    text-align: center;
}
</style>