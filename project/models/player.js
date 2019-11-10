const timestamp = require('time-stamp')
const Session = require('./session.js')

module.exports = class Player {
    constructor(name, visitedSessions = [], hostedSessions = [], id) {
        this.name = name
        this.visitedSessions = visitedSessions
        this.hostedSessions = hostedSessions
        this.id = id
    }
    visit(session) {
        if (session.game.maxPlayers <= session.players.length) {
            console.log('Sorry, this session is full.')
        } else if (session.host === undefined) {
            console.log('This session does not yet have a host.')
        } else {
            session.players.push(this.name)
            this.visitedSessions.push(session)
            console.log(this.name + ' joined ' + session.game.name + ' session at '+ timestamp('YYYY/MM/DD/HH:mm'))
            if (session.players.length >= session.game.minPlayers) {
                session.minPlayersMet = true
            }
        }
    }
    static create({name, visitedSessions, hostedSessions, id}) {
         return new Player(name, visitedSessions, hostedSessions, id)
    }
}