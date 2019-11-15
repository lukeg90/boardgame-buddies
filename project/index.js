const express = require('express')
const bodyParser = require('body-parser')

const playerRouter = require('./routes/player')
const sessionRouter = require('./routes/session')
const gameRouter = require('./routes/game')

require('./mongo-connection')

const app = express()

app.locals.moment = require('moment')

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/player', playerRouter)
app.use('/session', sessionRouter)
app.use('/game', gameRouter)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('Server listening')
})