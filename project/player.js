const timestamp = require('time-stamp')

module.exports = class Player {
    constructor(name) {
        this.name = name
        this.visitedSessions = []
        this.hostedSessions = []
    }
    visit(session) {
        if (session.game.maxPlayers <= session.players.length) {
            console.log('Sorry, this session is full.')
        } else if (session.hasOwnProperty('host') === false) {
            console.log('This session does not yet have a host.')
        } else {
            session.players.push(this.name)
            this.visitedSessions.push(session)
            console.log(this.name + ' joined at ' + timestamp('YYYY/MM/DD/HH:mm'))
            if (session.players.length >= session.game.minPlayers) {
                session.minPlayersMet = true
            }
        }
    }
}