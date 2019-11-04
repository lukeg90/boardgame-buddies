/*My idea is a sort of meetup/social network for people who want to play board games with others
in Berlin. Users will register and then either create a new session as a host (if they have a 
game and a place to play) or visit the session as a player.*/

const Player = require('./models/player.js')
const Game = require('./models/game.js')
const Session = require('./models/session.js')
const PlayerService = require('./services/player-service')
const GameService = require('./services/game-service')
const SessionService = require('./services/session-service')

async function main() {
    const james = new Player('James')
    const luke = new Player('Luke')
    const kate = new Player('Kate')
    const joe = new Player('Joe')
    const lisa = new Player('Lisa')
    const phil = new Player('Phil')
    const barb = new Player ('Barb')

    const risk = new Game('Risk', 2, 6)
    const catan = new Game('Catan', 3, 4)
    const scrabble = new Game ('Scrabble', 2, 4)

    const riskSession = new Session(risk, 'English', '20/11/2019', '19:00', '123 Anywhere St.')

    riskSession.setHost(luke)
    lisa.visit(riskSession)

    const catanSession = new Session(catan, 'German', '24/11/2019', '19:00', '432 Irgendwo Str.')

    james.visit(catanSession)
    catanSession.setHost(james)
    kate.visit(catanSession)
    joe.visit(catanSession)
    phil.visit(catanSession)
    luke.visit(catanSession)

    const scrabbleSession = new Session(scrabble, 'Spanish', '25/11/2019', '20:00', '22 Friedrichstr.')

    scrabbleSession.setHost(barb)

    await SessionService.add(riskSession)
    await SessionService.add(catanSession)
    await SessionService.add(scrabbleSession)

    await GameService.add(riskSession.game)
    await GameService.add(catanSession.game)
    await GameService.add(scrabbleSession.game)

    const sessions = await SessionService.findAll()

    console.log(sessions[1])

    await PlayerService.add(sessions[2].host)

    const players = await PlayerService.findAll()

    console.log(players[0])

    await PlayerService.del(1)

    const foundCatanSession = await SessionService.find(1)
    console.log(foundCatanSession)

    await PlayerService.add(foundCatanSession.players[0])

    const newPlayers = await PlayerService.findAll()

    console.log(newPlayers[0])    

}
main()
