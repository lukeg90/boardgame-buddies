const BaseService = require('./base-service')
const PlayerModel = require('../models/player')

class PlayerService extends BaseService {
    model = PlayerModel

   async visitSession(player, session) {
        if (session.game.maxPlayers <= session.players.length) {
            console.log('Sorry, this session is full.')
        } else {
        player.visitedSessions.push(session)
        session.players.push(player)
        if (session.players.length >= session.game.minPlayers) {
            session.minPlayersMet = true
        }
        await player.save()
        await session.save()
        }
    }
    async hostSession(host, session) {
        host.hostedSessions.push(session.id)
        session.host = host.id
        session.players.push(host)
        await host.save()
        await session.save()
    }
}

module.exports = new PlayerService()