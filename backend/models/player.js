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
