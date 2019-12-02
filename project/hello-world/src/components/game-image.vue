<script>
export default {
    name: 'GameImage',
    props: ['session'],
    computed: {
        SessionUrl() {
            return `/session/${this.session._id}`
        }
    }
}
</script>

<template lang="pug">
    router-link(:to="SessionUrl")
        img(v-if="session.game.name == 'Catan'" src="https://storage.needpix.com/rsynced_images/game-340574_1280.jpg" alt="Catan")
        img(v-else-if="session.game.name == 'Scrabble'" src="https://live.staticflickr.com/6024/5933744655_a7bb4e7ab4_b.jpg" alt="Scrabble")
        img(v-else-if="session.game.name == 'Risk'" src="https://live.staticflickr.com/22/27298596_face969d49_b.jpg" alt="Risk")
        img(v-else src="https://storage.needpix.com/rsynced_images/dice-2351448_1280.jpg")
</template>

<style scoped>
img {
    width: 320px;
    height: 200px;
}
</style>