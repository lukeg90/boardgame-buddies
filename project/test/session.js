import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Fetch a session', async t => {
    t.plan(3)
    const hostToCreate = {
        name: 'Phil',
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
        datetime: '2019-12-05T20:00',
        location: '321 Anywhere St.'
    }

    //create host
    const createdHost = (await request(app)
        .post('/player')
        .send(hostToCreate)).body

    //host creates session
    const hostSessionRes = await request(app)
        .post(`/player/${createdHost._id}/hosted-sessions`)
        .send(sessionToCreate)
    const createdSession = hostSessionRes.body

    //fetch session
    const fetchRes = await request(app).get(`/session/${createdSession._id}`)
    t.is(fetchRes.status, 200)

    const fetchResJson = await request(app).get(`/session/${createdSession._id}/json`)
    t.is(fetchResJson.status, 200)

    const fetchedSession = fetchResJson.body
    t.is(fetchedSession._id, createdSession._id)

    await request(app).delete(`/player/${createdHost._id}`)
    await request(app).delete(`/session/${createdSession._id}`)
})

test('Delete a session', async t => {
    t.plan(4)
    const hostToCreate = {
        name: 'Greg',
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
        datetime: '2019-12-05T20:00',
        location: '321 Anywhere St.'
    }

    //create host
    const createdHost = (await request(app)
        .post('/player')
        .send(hostToCreate)).body

    //host creates session
    const hostSessionRes = await request(app)
        .post(`/player/${createdHost._id}/hosted-sessions`)
        .send(sessionToCreate)
    const createdSession = hostSessionRes.body

    //delete created session
    const deleteRes = await request(app).delete(`/session/${createdSession._id}`)
    t.is(deleteRes.status, 200)
    t.is(deleteRes.ok, true)

    //check deleted session cannot be fetched
    const fetch = await request(app).get(`/session/${createdSession._id}`)
    t.is(fetch.status,404)

    const fetchJson = await request(app).get(`/session/${createdSession._id}/json`)
    t.is(fetchJson.status,404)

    await request(app).delete(`/player/${createdHost._id}`)    
})

test('Get list of sessions', async t => {
    const hostToCreate = {
        name: 'Lisa',
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
        datetime: '2019-12-05T20:00',
        location: '321 Anywhere St.'
    }

    //create host
    const createdHost = (await request(app)
        .post('/player')
        .send(hostToCreate)).body

    //host creates session
    const hostSessionRes = await request(app)
        .post(`/player/${createdHost._id}/hosted-sessions`)
        .send(sessionToCreate)
    const createdSession = hostSessionRes.body

    //fetch all sessions
    const res = await request(app).get('/session/all')
    t.is(res.status, 200)

    const jsonRes = await request(app).get('/session/all/json')
    t.is(jsonRes.status, 200)

    //check that list of sessions is an array which is not empty
    t.true(Array.isArray(jsonRes.body), 'Body should be an array')
    t.true(jsonRes.body.length > 0)

    await request(app).delete(`/player/${createdHost._id}`)
    await request(app).delete(`/session/${createdSession._id}`)
})

test('Get list of sessions on current date', async t => {
    const hostToCreate = {
        name: 'Audrey',
        visitedSessions: [],
        hostedSessions: []
    }
    //create session on current date
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

    //host creates session
    const hostSessionRes = await request(app)
        .post(`/player/${createdHost._id}/hosted-sessions`)
        .send(sessionToCreate)
    const createdSession = hostSessionRes.body

    //fetch all sessions on current date
    const res = await request(app).get('/session/all/today')
    t.is(res.status, 200)

    const jsonRes = await request(app).get('/session/all/today/json')
    t.is(jsonRes.status, 200)

    //check that list of sessions is an array which is not empty
    t.true(Array.isArray(jsonRes.body), 'Body should be an array')
    t.true(jsonRes.body.length > 0)

    await request(app).delete(`/player/${createdHost._id}`)
    await request(app).delete(`/session/${createdSession._id}`)
})