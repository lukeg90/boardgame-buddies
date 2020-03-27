const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const playerRouter = require('./routes/player')
const sessionRouter = require('./routes/session')

require('./mongo-connection')

const app = express()
app.use(cors())

app.locals.moment = require('moment')

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/player', playerRouter)
app.use('/session', sessionRouter)

app.get('/', (req, res) => {
    res.render('index')
})

module.exports = app