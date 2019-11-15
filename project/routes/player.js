const express = require('express')
const router = express.Router()

const PlayerService = require('../services/player-service')
const SessionService = require('../services/session-service')

router.get('/all', async (req, res) => {
    const players = await PlayerService.findAll()
    res.render('players', { players: players })
})

router.get('/:id', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    res.render('player-profile', {player: player})
})

router.post('/', async (req, res) => {
    const player = await PlayerService.add(req.body)
    res.send(player)
})

router.delete('/:id', async (req, res) => {
    await PlayerService.del(req.params.id)
    res.send('successfully deleted')
})

//visit session
router.post('/:id/visitedSessions', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    const session = await SessionService.find(req.body.session)
    await PlayerService.visitSession(player, session)
    res.send('Session joined')
})

//create and host session
router.post('/:id/hostedSessions', async (req, res) => {
    const host = await PlayerService.find(req.params.id)
    const session = await SessionService.add(req.body)
    await PlayerService.hostSession(host, session)
    res.send('Session has been created. Session ID: ' + session.id)
})

module.exports = router