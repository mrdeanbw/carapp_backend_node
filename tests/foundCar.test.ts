import { createConnection } from 'typeorm'
import { CarRepository } from '../src/repository/CarRepository'

// test is expected to work
describe('find new car in database table', () => {
  let connection: any
  let carRepo: any

  beforeAll(async () => {
    connection = await createConnection()
    carRepo = new CarRepository()

    // Insert the record
    await carRepo.createCar(false, 4, 2000, 'Geo', 'Metro', '?', '?', null)
  })

  afterAll(async () => {
    // Delete the record
    await carRepo.deleteCar('Geo', 'Metro')

    await connection.close()
  })

  test('Find new car that was inserted via make and model', async done => {
    // Select the record
    const foundCar = await carRepo.findByMakeModel('Geo', 'Metro')

    expect(foundCar.lease).toBeFalsy()
    expect(foundCar.seats).toBeTruthy()
    expect(foundCar.year).toBeTruthy()
    expect(foundCar.make).toBeTruthy()
    expect(foundCar.model).toBeTruthy()
    expect(foundCar.trim).toBeTruthy()
    expect(foundCar.specs).toBeTruthy()
    done()
  })
})
