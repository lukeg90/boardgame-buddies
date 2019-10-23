/*My idea is a sort of meetup/social network for people who want to play board games with others
in Berlin. Users will register and then either create a new session as a host (if they have a 
game and a place to play) or join the session as a player.*/

Player = class {
    constructor(name) {
        this.name = name
        this.visitedSessions = []
        this.hostedSessions = []
    }
    visit(session) {
        if (session.game.maxPlayers === session.players.length) {
            console.log('Sorry, this session is full.')
        } else {
        session.players.push(this)
        this.visitedSessions.push(session)
        }
    }
}

Game = class {
    constructor(name, minPlayers, maxPlayers) {
        this.name = name
        this.minPlayers = minPlayers
        this.maxPlayers = maxPlayers
    }
}

Session = class {
    constructor(game, language, date, time, address) {
        this.game = game
        this.language = language
        this.date = date
        this.time = time
        this.address = address
        this.players = []
    }
    hostedBy(player) {
        this.host = player
        this.players.push(player)
        player.hostedSessions.push(this)
    }
}

luke = new Player('Luke')
bob = new Player('Bob')
jane = new Player('Jane')
kate = new Player('Kate')
phil = new Player('Phil')
carl = new Player('Carl')
lisa = new Player('Lisa')


risk = new Game('Risk', 2, 6)

riskSession = new Session(risk, 'English', '20/10/2019', '20:00', '123 Anywhere St.')

riskSession.hostedBy(luke)

console.log(riskSession)

bob.visit(riskSession)
jane.visit(riskSession)
kate.visit(riskSession)
phil.visit(riskSession)
carl.visit(riskSession)

console.log(lisa.visit(riskSession))

console.log(luke.hostedSessions)
