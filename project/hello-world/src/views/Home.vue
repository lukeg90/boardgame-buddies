<script>
// @ is an alias to /src
import SessionCard from '@/components/session-card.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    SessionCard
  },
  computed: {
    ...mapState(['sessionsToday']),
    sortedSessions: function() {
      return this.sessionsToday.slice().sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    }
  },
  methods: {
    ...mapActions(['fetchSessionsToday'])
  },
  created() {
    this.fetchSessionsToday()
  }
}
</script>

<template lang="pug">
  main
    h1 Board Game Buddies Berlin
    section
      h1(v-if="sessionsToday.length == 0") No Sessions Today &#128546
      session-card(v-else v-for="session in sortedSessions", :session="session")
</template>

<style scoped>
section {
  padding: 40px 0;
}

</style>