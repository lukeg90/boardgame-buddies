<script>

import { mapState, mapActions } from 'vuex'
import PlayerCard from '@/components/player-card.vue'

export default {
    name: 'Player',
    components: {
        PlayerCard
    },
    computed: {
        ...mapState(['player'])
    },
    methods: {
        ...mapActions(['fetchPlayer'])
    },
    created() {
        this.fetchPlayer(this.$route.params.id)
    }
}
</script>

<template lang="pug">
    main 
        player-card(:player="player")
</template>