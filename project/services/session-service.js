const BaseService = require('./base-service')
const SessionModel = require('../models/session')

class SessionService extends BaseService {
    constructor() {
        super(SessionModel, `${__dirname}/../sessions.json`)
    }
}
module.exports = new SessionService()