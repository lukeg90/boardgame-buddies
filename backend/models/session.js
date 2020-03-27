const mongoose = require('mongoose')

// To be used as a nested object inside SessionSchema.
// Game Model no longer necessary.
const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    minPlayers: {
        type: Number,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    }
})

const SessionSchema = new mongoose.Schema({
    game: {
        type: GameSchema,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        min: () => Date.now(),
        required: true
    },
    location: {
        type: String,
        required: true
    },
    minPlayersMet: {
        type: Boolean,
        default: false
    },
    players: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Player',
        autopopulate: {
            maxDepth: 2
        }
    }],
    host: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Player',
        autopopulate: {
            maxDepth: 2
        },
    }
})

SessionSchema.plugin(require('mongoose-autopopulate'))

const SessionModel = mongoose.model('Session', SessionSchema)

module.exports = SessionModel
