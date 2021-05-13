import app from '../app'
import { createConnection } from 'typeorm'
import * as request from 'supertest'

// this test should work
describe('GET /test - a simple api endpoint without TypeORM connection', () => {
  let endpoint: any
  let connection: any

  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  test('simple API Request', async (done) => {
    endpoint = await request(app).get('/test')

    expect(endpoint.text).toEqual('test endpoint!')
    expect(endpoint.status).toEqual(200)
    // expect(endpoint.req.method).toEqual('GET')
    done()
  })

  test('simple API Request 2', async (done) => {
    endpoint = await request(app).get('/test2')

    expect(endpoint.text).toEqual('test2 endpoint!')
    expect(endpoint.status).toEqual(200)
    // expect(endpoint.req.method).toEqual('GET')
    done()
  })
})
