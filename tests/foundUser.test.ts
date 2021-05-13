import { createConnection } from 'typeorm'
import { UserRepository } from '../src/repository/UserRepository'

// test is expected to work
describe('find new user in database table', () => {
  let connection: any
  let userRepo: any

  beforeAll(async () => {
    connection = await createConnection()
    userRepo = new UserRepository()

    // Insert the record
    await userRepo.createUser('harrypotter@email.com', 'Hogwarts', 'Harry', 'Potter', 0)
  })

  afterAll(async () => {
    // Delete the record
    await userRepo.deleteUser('harrypotter@email.com')

    await connection.close()
  })

  test('Find new user that was inserted via email', async done => {
    // Find the inserted recard
    const foundUser = await userRepo.findByEmail('harrypotter@email.com')

    expect(foundUser.email).toBeTruthy()
    expect(foundUser.password).toBeTruthy()
    expect(foundUser.firstName).toBeTruthy()
    expect(foundUser.lastName).toBeTruthy()
    expect(foundUser.license).toBeFalsy()
    done()
  })
})
