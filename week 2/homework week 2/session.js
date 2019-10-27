const timestamp = require('time-stamp')

module.exports = class Session {
    constructor(game, language, date, time, address) {
        this.game = game
        this.language = language
        this.date = date
        this.time = time
        this.address = address
        this.players = []
        this.minPlayersMet = false
    }
    setHost(player) {
        this.host = player.name
        this.players.push(player.name)
        player.hostedSessions.push(this)
        console.log('Hosted by ' + player.name + ' on ' + timestamp('YYYY/MM/DD'))
    }
}