const express = require('express')
const router = express.Router()

const SessionService = require('../services/session-service')

router.get('/all', async (req, res) => {
    const sessions = await SessionService.findAll()
    res.render('sessions', { sessions: sessions })
})

router.get('/all/today', async (req, res) => {
    const sessionsToday = await SessionService.findSessionsToday()
    res.render('sessions', { sessions: sessionsToday })
})

router.get('/:id', async (req, res) => {
    const session = await SessionService.find(req.params.id)
    res.render('session-profile', {session: session})
})

router.delete('/:id', async (req, res) => {
    await SessionService.del(req.params.id)
    res.send('successfully deleted')
})

module.exports = router