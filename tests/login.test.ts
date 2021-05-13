import app from '../app'
import { createConnection } from 'typeorm'
import * as request from 'supertest'
import { UserRepository } from '../src/repository/UserRepository'

// login test is expected to work
describe('POST /users/authenticate - login test', () => {
  let result: any
  let connection: any
  let userRepo: any
  let parsed: any

  beforeAll(async () => {
    connection = await createConnection()
    userRepo = new UserRepository()

    // Insert the record
    await userRepo.createUser('person@gmail.com', 'secretpass', '', '', 0)
  })

  afterAll(async () => {
    // Delete the record
    await userRepo.deleteUser('person@gmail.com')

    await connection.close()
  })

  test('Login with valid credentials', async (done) => {
    result = await request(app).post('/users/authenticate').send({
      username: 'person@gmail.com',
      password: 'secretpass'
    })

    parsed = JSON.parse(result.text)
    expect(parsed.email).toEqual('person@gmail.com')
    expect(result.status).toEqual(200)
    done()
  })

  test('Login with invalid credentials', async (done) => {
    const result = await request(app).post('/users/authenticate').send({
      username: 'perosn@mgail.com',
      password: 'sesretpass'
    })

    parsed = JSON.parse(result.text)
    expect(parsed.message).toEqual('Username or password is incorrect!')
    expect(result.status).toEqual(400)
    done()
  })

  test('Login with correct username but invalid password', async (done) => {
    const result = await request(app).post('/users/authenticate').send({
      username: 'person@gmail.com',
      password: 'secretpadd'
    })

    parsed = JSON.parse(result.text)
    expect(parsed.message).toEqual('Username or password is incorrect!')
    expect(result.status).toEqual(400)
    done()
  })
})
