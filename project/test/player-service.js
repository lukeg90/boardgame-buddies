import test from 'ava'
import request from 'supertest'
import app from '../app'
import { throwStatement } from 'babel-types'
const PlayerService = require('../services/player-service')

test('Check outcome when session is full', async t => {
    const session = {
        game: {
            maxPlayers: 1
        },
        players: ['Somebody']
    }
    const player = 'Somebody else'

    const actualResult = await PlayerService.visitSession(player, session)
    const expectedResult = undefined
    
    t.is(actualResult, expectedResult)
})

//does not work. line 13 still shows as untested
test('Check outcome when minPlayers is met', async t => {
    const session = {
        game: {
            minPlayers: 2,
            maxPlayers: 4
        },
        players: [{
            name: 'Somebody',
            visitedSessions: []
        }],
        minPlayersMet: false,
        save() { 
            console.log('session saved') 
        }
    }
    const player = {
        name: 'Somebody else',
        visitedSessions: [],
        save() { 
            console.log('player saved') 
        }
    }
    await PlayerService.visitSession(player, session)
    t.is(session.minPlayersMet, true)
})



