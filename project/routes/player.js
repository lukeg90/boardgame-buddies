const express = require('express')
const router = express.Router()

const PlayerService = require('../services/player-service')
const SessionService = require('../services/session-service')

router.get('/all', async (req, res) => {
    const players = await PlayerService.findAll()
    res.render('players', { players: players })
})

router.get('/all/json', async (req, res) => {
    const players = await PlayerService.findAll()
    res.send(players)
})

router.get('/:id', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    if (!player) res.status(404)
    res.render('player-profile', {player: player})
})

router.get('/:id/json', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    if (!player) res.status(404)
    res.send(player)
})

router.post('/', async (req, res) => {
    const player = await PlayerService.add(req.body)
    res.send(player)
})

router.delete('/:id', async (req, res) => {
    await PlayerService.del(req.params.id)
    res.send('successfully deleted')
})

// router.delete('/all/delete', async (req, res) => {
//     await PlayerService.deleteAll()
//     res.send('All players deleted')
// })

//visit session
router.post('/:id/visited-sessions', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    const session = await SessionService.find(req.body.session)
    await PlayerService.visitSession(player, session)
    res.send(session)
})
    
//create and host session
router.post('/:id/hosted-sessions', async (req, res) => {
    const host = await PlayerService.find(req.params.id)
    const session = await SessionService.add(req.body)
    await PlayerService.hostSession(host, session)
    res.send(session)
})

module.exports = router