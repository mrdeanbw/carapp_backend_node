import app from '../app'
import { createConnection } from 'typeorm'
import * as request from 'supertest'
import { UserRepository } from '../src/repository/UserRepository'

// login test is expected to work
describe('POST /users/register - add new user to database table', () => {
  let result: any
  let connection: any
  let userRepo: any
  let parsed: any

  beforeAll(async () => {
    connection = await createConnection()
    userRepo = new UserRepository()
  })

  afterAll(async () => {
    // Delete the record
    await userRepo.deleteUser('xxxxx@mail.com')

    await connection.close()
  })

  test('Register new user with valid credentials', async (done) => {
    result = await request(app).post('/users/register').send({
      username: 'xxxxx@mail.com',
      password: 'zzzzzzzzzzz',
      firstName: 'vvvvvvvvvvv',
      lastName: 'mmmmmmmmmmmm',
      license: 222222222
    })

    expect(result.text).toEqual('Register event has been logged')
    expect(result.status).toEqual(200)
    done()
  })

  test('Register new user with existing username', async (done) => {
    result = await request(app).post('/users/register').send({
      username: 'xxxxx@mail.com',
      password: 'oooooooooooo',
      firstName: 'ppppppppppp',
      lastName: 'ssssssssssss',
      license: 1
    })

    parsed = JSON.parse(result.text)
    expect(parsed.message).toEqual('Username/Email: xxxxx@mail.com is already taken')
    expect(result.status).toEqual(400)
    done()
  })

  test('Register new user without password', async (done) => {
    result = await request(app).post('/users/register').send({
      username: 'qqqqqqqqqqqq',
      password: '', // table accepts empty string ''
      firstName: 'ppppppppppp',
      lastName: 'ssssssssssss',
      license: 1
    })

    parsed = JSON.parse(result.text)
    expect(parsed).toEqual('email and password cannot be empty')
    expect(result.status).toEqual(200)
    done()
  })

  test('Register new user with invalid license', async (done) => {
    result = await request(app).post('/users/register').send({
      username: 'random@mail.com',
      password: 'password',
      firstName: 'first',
      lastName: 'last',
      license: 2147483648 // 1 above integer limit
    })

    parsed = JSON.parse(result.text)
    expect(parsed).toEqual('could not create new user')
    expect(result.status).toEqual(200)
    done()
  })
})
