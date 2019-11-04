const timestamp = require('time-stamp')

module.exports = class Session {
    constructor(game, language, date, time, address, players = [], minPlayersMet = false, host = undefined, id) {
        this.game = game
        this.language = language
        this.date = date
        this.time = time
        this.address = address
        this.players = players
        this.minPlayersMet = minPlayersMet
        this.host = host
        this.id = id
    }
    setHost(player) {
        this.host = player
        this.players.push(player)
        player.hostedSessions.push(this)
        console.log(this.game.name + ' session hosted by ' + player.name + ' on ' + timestamp('YYYY/MM/DD'))
    }
    static create({game, language, date, time, address, players, minPlayersMet, host, id}) {
        return new Session(game, language, date, time, address, players, minPlayersMet, host, id)
    }
}