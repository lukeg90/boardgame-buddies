<template lang="pug">
  main
    h1 {{ session.game.name }} 
    p Language: {{ session.language }}
    p(:class="{red: datePast}") Date and time: {{ moment(session.datetime).format('MMMM Do YYYY, h:mm a') }}
    p Location: {{ session.location }}  
    p Host: {{ session.host.name }}
    p Players: 
        ul
            li(v-for="player in session.players") {{ player.name }}
    h3.red(v-if="datePast") Game session past
    h3.red(v-else-if="!session.minPlayersMet") {{ session.game.minPlayers - session.players.length }} players still needed. Invite your friends!
    h3(v-else-if="session.minPlayersMet" style="color: green") Ready to play!

</template>

<script>

import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'Session',
  computed: {
    ...mapState(['session', 'now']),
  },
  methods: {
    ...mapActions(['fetchSession', 'startTicker']),
      datePast() {
      if (this.session.datetime < this.now) {
          return true
      } else {
          return false
      }
    }
  },
  created() {
    this.fetchSession(this.$route.params.id)
  },
  mounted() {
    this.startTicker()
  }
}
</script>
<style scoped>
.red {
    color: red;
}
main {
    text-align: left;
}
</style>