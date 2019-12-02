const express = require('express')
const router = express.Router()

const SessionService = require('../services/session-service')

router.get('/all', async (req, res) => {
    const sessions = await SessionService.findAll()
    res.render('sessions', { sessions: sessions })
})

router.get('/all/json', async (req, res) => {
    const sessions = await SessionService.findAll()
    res.send(sessions)
})

router.get('/all/today', async (req, res) => {
    const sessionsToday = await SessionService.findSessionsToday()
    res.render('sessions', { sessions: sessionsToday })
})

router.get('/all/today/json', async (req, res) => {
    const sessionsToday = await SessionService.findSessionsToday()
    res.send(sessionsToday)
})

router.get('/:id', async (req, res) => {
    const session = await SessionService.find(req.params.id)
    if (!session) res.status(404)
    res.render('session-profile', {session: session})
})

router.get('/:id/json', async (req, res) => {
    const session = await SessionService.find(req.params.id)
    if (!session) res.status(404)
    res.send(session)
})

router.delete('/:id', async (req, res) => {
    await SessionService.del(req.params.id)
    res.send('successfully deleted')
})

router.delete('/all/delete', async (req, res) => {
    await SessionService.deleteAll()
    res.send('All sessions deleted')
})

module.exports = router