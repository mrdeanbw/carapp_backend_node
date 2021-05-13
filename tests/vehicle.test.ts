import app from '../app'
import { createConnection } from 'typeorm'
import { CarRepository } from '../src/repository/CarRepository'
import * as request from 'supertest'

// login test is expected to work
describe('POST /vehicles - add new car to database table', () => {
  let carData: any
  let result: any
  let connection: any
  let carRepo: any

  beforeAll(async () => {
    connection = await createConnection()
    carRepo = new CarRepository()
  })

  afterAll(async () => {
    // Removes the car from the database
    await carRepo.deleteCar('Volkswagen', 'Golf')

    await connection.close()
  })

  test('Register new car with valid credentials', async (done) => {
    carData = [false, 5, 2017, 'Volkswagen', 'Golf', 'TSI Wolfsburg Edition', '170 HP']

    result = await request(app).post('/vehicles').send({
      carData
    })

    expect(result.text).toEqual('Vehicles event has been logged')
    expect(result.status).toEqual(200)
    done()
  })

  test('Register new car without carname', async (done) => {
    carData = ['blah', 'five', '2017', 'Volkswagen', 'Golf', 'TSI Wolfsburg Edition', '170 HP']
    result = await request(app).post('/vehicles').send({
      carData
    })

    const parsed = JSON.parse(result.text)
    expect(parsed).toEqual('could not insert car data')
    expect(result.status).toEqual(200)
    done()
  })
})
