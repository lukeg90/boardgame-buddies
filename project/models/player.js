const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    visitedSessions: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Session',
        autopopulate: {
            maxDepth: 2
        }
    }],
    hostedSessions: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Session',
        autopopulate: {
            maxDepth: 2
        }
    }]
})

PlayerSchema.plugin(require('mongoose-autopopulate'))

const PlayerModel = mongoose.model('Player', PlayerSchema)

module.exports = PlayerModel

// const timestamp = require('time-stamp')

// module.exports = class Player {
//     constructor(name, visitedSessions = [], hostedSessions = [], id) {
//         this.name = name
//         this.visitedSessions = visitedSessions
//         this.hostedSessions = hostedSessions
//         this.id = id
//     }
//     visit(session) {
//         if (session.game.maxPlayers <= session.players.length) {
//             console.log('Sorry, this session is full.')
//         } else if (session.host === undefined) {
//             console.log('This session does not yet have a host.')
//         } else {
//             session.players.push(this.name)
//             this.visitedSessions.push(session)
//             console.log(this.name + ' joined ' + session.game.name + ' session at '+ timestamp('YYYY/MM/DD/HH:mm'))
//             if (session.players.length >= session.game.minPlayers) {
//                 session.minPlayersMet = true
//             }
//         }
//     }
//     static create({name, visitedSessions, hostedSessions, id}) {
//          return new Player(name, visitedSessions, hostedSessions, id)
//     }
// }
// const timestamp = require('time-stamp')

// module.exports = class Player {
//     constructor(name, visitedSessions = [], hostedSessions = [], id) {
//         this.name = name
//         this.visitedSessions = visitedSessions
//         this.hostedSessions = hostedSessions
//         this.id = id
//     }
//     visit(session) {
//         if (session.game.maxPlayers <= session.players.length) {
//             console.log('Sorry, this session is full.')
//         } else if (session.host === undefined) {
//             console.log('This session does not yet have a host.')
//         } else {
//             session.players.push(this.name)
//             this.visitedSessions.push(session)
//             console.log(this.name + ' joined ' + session.game.name + ' session at '+ timestamp('YYYY/MM/DD/HH:mm'))
//             if (session.players.length >= session.game.minPlayers) {
//                 session.minPlayersMet = true
//             }
//         }
//     }
//     static create({name, visitedSessions, hostedSessions, id}) {
//          return new Player(name, visitedSessions, hostedSessions, id)
//     }
// }