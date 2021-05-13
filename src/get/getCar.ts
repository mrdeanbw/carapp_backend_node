import { CarRepository } from '../repository/CarRepository'

export const getCar = async (userId: number) => {
  const carRepo = new CarRepository()

  console.log('from getCar.ts searching for: ' + userId)

  const foundCar = await carRepo.findByUserId(userId)

  const carMessage = 'Your car is a ' + foundCar.year + ' ' + foundCar.make + ' ' + foundCar.model + '. It has ' + foundCar.seats + ' seats and it is ' + (foundCar.lease === false ? 'not' : '') + ' a lease. The trim is: ' + foundCar.trim + ' and the specs are: ' + foundCar.specs

  console.log('from getCar.ts ' + carMessage)

  return carMessage
}
