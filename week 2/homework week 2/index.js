/*My idea is a sort of meetup/social network for people who want to play board games with others
in Berlin. Users will register and then either create a new session as a host (if they have a 
game and a place to play) or join the session as a player.*/

// const Player = require('./player.js')
// const Game = require('./game.js')
// const Session = require('./session.js')
const Database = require('./database.js')

// luke = new Player('Luke')
// bob = new Player('Bob')
// jane = new Player('Jane')
// kate = new Player('Kate')
// phil = new Player('Phil')
// carl = new Player('Carl')
// lisa = new Player('Lisa')

// const players = [luke, bob, jane, kate, phil, carl, lisa]

// risk = new Game('Risk', 2, 6)
// catan = new Game('Catan', 3, 4)

// const games = [risk, catan]

// riskSession = new Session(risk, 'English', '20/10/2019', '20:00', '123 Anywhere St.')
// catanSession = new Session(catan, 'German', '27/10/2019', '19:30', '456 Irgendwo Str.')

// const sessions = [riskSession, catanSession]

// riskSession.setHost(luke)

// console.log(riskSession)

// lisa.visit(riskSession)

// console.log(riskSession)

// bob.visit(riskSession)
// jane.visit(riskSession)
// phil.visit(riskSession)
// kate.visit(riskSession)
// console.log(carl.visit(riskSession))

// console.log(luke)
// console.log(jane)

// Database.save('players.json', players)
// Database.save('games.json', games)
// Database.save('sessions.json', sessions)

const loadedPlayers = Database.load('players.json')
const loadedGames = Database.load('games.json')
const loadedSessions = Database.load('sessions.json')

console.log(loadedPlayers)
console.log(loadedGames)
console.log(loadedSessions)