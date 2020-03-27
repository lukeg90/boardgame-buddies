import test from 'ava'
import request from 'supertest'
import app from '../app'

test('render homepage', async t => {
    t.plan(1)
    const homepageRes = await request(app).get('/')
    t.is(homepageRes.status, 200)
})