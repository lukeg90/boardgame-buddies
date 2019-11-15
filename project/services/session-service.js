const BaseService = require('./base-service')
const SessionModel = require('../models/session')
const moment = require('moment')

class SessionService extends BaseService {
    model = SessionModel

    findSessionsToday = async function () {
        return SessionModel.find({
            datetime: {
                $gte: moment().startOf('day'),
                $lte: moment().endOf('day')
            }
        })
    }
}

module.exports = new SessionService()