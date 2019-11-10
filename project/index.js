/*My idea is a sort of meetup/social network for people who want to play board games with others
in Berlin. Users will register and then either create a new session as a host (if they have a 
game and a place to play) or visit the session as a player.*/

const express = require('express')
const bodyParser = require('body-parser')

const PlayerService = require('./services/player-service')
const GameService = require('./services/game-service')
const SessionService = require('./services/session-service')

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/game/all', async (req, res) => {
    const games = await GameService.findAll()
    res.send(games)
})

app.get('/session/all', async (req, res) => {
    const sessions = await SessionService.findAll()
    res.render('sessions', { sessions: sessions })
})

app.get('/player/all', async (req, res) => {
    const players = await PlayerService.findAll()
    res.render('players', { players: players })
})

app.get('/player/:id', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    res.render('player-profile', {player: player})
})

app.get('/session/:id', async (req, res) => {
    const id = req.params.id
    const session = await SessionService.find(id)
    res.render('session-profile', {session: session})
})

app.post('/player', async (req, res) => {
    const player = await PlayerService.add(req.body)
    res.send(player)

})
app.post('/session', async (req, res) => {
    const session = await SessionService.add(req.body)
    res.send(session)
})

// host session
app.post('/:playerId/host/:sessionId', async (req, res) => {
    const allSessions = await SessionService.findAll()
    const allPlayers = await PlayerService.findAll()
    const sessionWithoutHost = allSessions.find(p => p.id == req.params.sessionId)
    const willingHost = allPlayers.find(p => p.id == req.params.PlayerId)
    sessionWithoutHost.setHost(willingHost)
    res.send('Host set')
    await SessionService.saveAll(allSessions)
    await PlayerService.saveAll(allPlayers)
})

// visit session
app.post('/:playerId/visit/:sessionId', async (req, res) => {
    const allSessions = await SessionService.findAll()
    const allPlayers = await PlayerService.findAll()  
    const visitingPlayer = allPlayers.find(p => p.id == req.params.playerId)
    const desiredSession = allSessions.find(p => p.id == req.params.sessionId)
    visitingPlayer.visit(desiredSession)
    res.send('Player has been added to the session')
    await SessionService.saveAll(allSessions)
    await PlayerService.saveAll(allPlayers)
})

app.delete('/session/:id', async (req, res) => {
    await SessionService.del(req.params.id)
    res.send('successfully deleted')
})

app.delete('/player/:id', async (req, res) => {
    await PlayerService.del(req.params.id)
    res.send('successfully deleted')
})

app.listen(3000, () => {
    console.log('Server listening')
})