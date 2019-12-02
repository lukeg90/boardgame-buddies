<script>

import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'Session',
  components: {

  },
  computed: {
    ...mapState(['session'])
  },
  methods: {
    ...mapActions(['fetchSession']),
      datePast() {
      if (this.session.datetime < moment()) {
          return true
      } else {
          return false
      }
    }
  },
  created() {
    this.fetchSession(this.$route.params.id)
  },
}
</script>

<template lang="pug">
  main
    h1 {{ session.game.name }} 
    p Language: {{ session.language }}
    p(:class="{red: datePast()}") Date and time: {{ moment(session.datetime).format('MMMM Do YYYY, h:mm a') }}
    p Location: {{ session.location }}
    p Host: {{ session.host.name }}
    p Players: 
        ul
            li(v-for="player in session.players") {{ player.name }}
    h3.red(v-if="datePast()") Game session past
    h3.red(v-else-if="!session.minPlayersMet") {{ session.game.minPlayers - session.players.length }} players still needed. Invite your friends!
    h3(v-else-if="session.minPlayersMet" style="color: green") Ready to play!

</template>

<style scoped>
.red {
    color: red;
}
main {
    text-align: left;
}
</style>