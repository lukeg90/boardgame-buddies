const BaseService = require('./base-service')
const GameModel = require ('../models/game')

class GameService extends BaseService {
    constructor() {
        super(GameModel, `${__dirname}/../games.json`)
    }
}
module.exports = new GameService()