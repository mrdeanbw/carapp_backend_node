import { CarRepository } from '../repository/CarRepository'

export const createNewCar = async (lease: boolean, seats: number, year: number, make: string, model: string, trim: string, specs: string, userId: number) => {
  console.log('createNewCar called')
  console.log(lease, seats, year, make, model, trim, specs, userId)
  const carRepo = new CarRepository()

  const newcar = await carRepo.createCar(lease, seats, year, make, model, trim, specs, userId)

  console.log('from createNewCar.ts ' + newcar)

  return newcar
}
