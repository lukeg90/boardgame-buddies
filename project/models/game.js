module.exports = class Game {
    constructor(name, minPlayers, maxPlayers, id) {
        this.name = name
        this.minPlayers = minPlayers
        this.maxPlayers = maxPlayers
        this.id = id
    }
    static create({name, minPlayers, maxPlayers, id}) {
        return new Game(name, minPlayers, maxPlayers, id)
    }
}