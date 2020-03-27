import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Create a new player', async t => {
    t.plan(2)
    const playerToCreate = {
        name: 'Luke',
        visitedSessions: [],
        hostedSessions: []
    }
    const res = await request(app)
        .post('/player')
        .send(playerToCreate)

    t.is(res.status, 200)

    t.is(res.body.name, playerToCreate.name)

    await request(app).delete(`/player/${res.body._id}`)
})

test('Fetch a player', async t => {
    t.plan(3)
    const playerToCreate = {
        name: 'Kate',
        visitedSessions: [],
        hostedSessions: []
    }

    const katePlayerCreated = (await request(app)
        .post('/player')
        .send(playerToCreate)).body

    const fetchRes = await request(app).get(`/player/${katePlayerCreated._id}`)
    t.is(fetchRes.status, 200)

    const fetchResJson = await request(app).get(`/player/${katePlayerCreated._id}/json`)
    t.is(fetchResJson.status, 200)

    const katePlayerFetched = fetchResJson.body
    t.deepEqual(katePlayerFetched, katePlayerCreated)

    await request(app).delete(`/player/${katePlayerCreated._id}`)
})

test('Delete a player', async t => {
    t.plan(4)
    const playerToCreate = {
        name: 'John',
        visitedSessions: [],
        hostedSessions: []  
    }
    const johnPlayerCreated = (await request(app)
        .post('/player')
        .send(playerToCreate)).body

    const deleteRes = await request(app).delete(`/player/${johnPlayerCreated._id}`)
    t.is(deleteRes.status, 200)
    t.is(deleteRes.ok, true)

    const fetch = await request(app).get(`/player/${johnPlayerCreated._id}`)
    t.is(fetch.status, 404)

    const fetchJson = await request(app).get(`/player/${johnPlayerCreated._id}/json`)
    t.is(fetchJson.status, 404)
})

// test('Delete all players', async t => {
//     const firstPlayerToCreate = {
//         name: 'Fred',
//         visitedSessions: [],
//         hostedSessions: []  
//     }
//     const secondPlayerToCreate = {
//         name: 'George',
//         visitedSessions: [],
//         hostedSessions: []  
//     }
//     const firstPlayerCreated = (await request(app)
//     .post('/player')
//     .send(firstPlayerToCreate)).body

//     const secondPlayerCreated = (await request(app)
//     .post('/player')
//     .send(secondPlayerToCreate)).body

    //delete all players
//     const deleteRes = await request(app).delete('/player/all/delete')
//     t.is(deleteRes.status, 200)
//     t.is(deleteRes.ok, true)

//     console.log(secondPlayerCreated)

//     // make sure neither player can be fetched
//     const firstFetch = await request(app).get(`/player/${firstPlayerCreated._id}`)
//     t.is(firstFetch.status, 404)

//     const firstFetchJson = await request(app).get(`/player/${firstPlayerCreated._id}/json`)
//     t.is(firstFetchJson.status, 404)

//     const secondFetch = await request(app).get(`/player/${secondPlayerCreated._id}`)
//     t.is(secondFetch.status, 404)

//     const secondFetchJson = await request(app).get(`/player/${secondPlayerCreated._id}/json`)
//     t.is(secondFetchJson.status, 404)
// })

test('Get list of players', async t => {
    t.plan(4)
    const playerToCreate = {
        name: 'Joe', 
        visitedSessions: [],
        hostedSessions: []
    }
    const _ = await request(app)
        .post('/player')
        .send(playerToCreate)
    
    const res = await request(app).get('/player/all')
    t.is(res.status, 200)

    const jsonRes = await request(app).get('/player/all/json')
    t.is(jsonRes.status, 200)

    t.true(Array.isArray(jsonRes.body), 'Body should be an array')
    t.true(jsonRes.body.length > 0)

    await request(app).delete(`/player/${_.body._id}`)
})

test('Player creates and hosts a session', async t => {
    t.plan(6)
    const palitaPlayer = {
        name: 'Palita',
        visitedSessions: [],
        hostedSessions: []
    }
    const catanSession = {
        game: {
            name: 'Catan',
            minPlayers: 3,
            maxPlayers: 4
        },
        language: 'English',
        datetime: Date.now() + 2400000,
        location: '123 Anywhere St.'
    }
    //create player
    const createdPlayer = (await request(app)
        .post('/player')
        .send(palitaPlayer)).body

    // player creates and hosts session
    const hostSessionRes = await request(app)
        .post(`/player/${createdPlayer._id}/hosted-sessions`)
        .send(catanSession)

    //check server response success
    t.is(hostSessionRes.status, 200)

    // response body is new session
    const newSession = hostSessionRes.body

    //check new session has been created from request body
    t.is(newSession.game.name, catanSession.game.name)

    //check that new session is in player's hosted sessions
    t.is(newSession._id, newSession.host.hostedSessions[0]._id)
    
    //check that player is host of new session
    t.is(newSession.host._id, createdPlayer._id)

    //check that host is also a player in new session
    t.is(newSession.players[0]._id, newSession.host._id)

    //check new session is not the same as request body
    t.notDeepEqual(catanSession, newSession)

    await request(app).delete(`/session/${newSession._id}`)
    await request(app).delete(`/player/${createdPlayer._id}`)
})

test('Player visits a session', async t => {
    t.plan(4)
    const hostToCreate = {
        name: 'Rene',
        visitedSessions: [],
        hostedSessions: []
    }
    const playerToCreate = {
        name: 'Dudley',
        visitedSessions: [],
        hostedSessions: []
    }
    const sessionToCreate = {
        game: {
            name: 'Scrabble',
            minPlayers: 2,
            maxPlayers: 4
        },
        language: 'English',
        datetime: Date.now() + 2400000,
        location: '321 Anywhere St.'
    }

    //create host
    const createdHost = (await request(app)
        .post('/player')
        .send(hostToCreate)).body
    
    //create player
    const createdPlayer = (await request(app)
        .post('/player')
        .send(playerToCreate)).body

    //host creates session
    const hostSessionRes = await request(app)
        .post(`/player/${createdHost._id}/hosted-sessions`)
        .send(sessionToCreate)
    const createdSession = hostSessionRes.body

    //player visits session
    const visitSessionRes = await request(app)
        .post(`/player/${createdPlayer._id}/visited-sessions`)
        .send({ session: createdSession._id })

    t.is(visitSessionRes.status, 200)

    const visitedSession = visitSessionRes.body

    //check session includes createdPlayer
    t.is(visitedSession.players[1].name, createdPlayer.name)

    //check session is on createdPlayer's list of visited sessions
    t.is(visitedSession._id, visitedSession.players[1].visitedSessions[0]._id)

    t.is(visitedSession.minPlayersMet, true)

    await request(app).delete(`/player/${createdHost._id}`)
    await request(app).delete(`/player/${createdPlayer._id}`)
    await request(app).delete(`/session/${visitedSession._id}`)
})