import { EntityRepository, getConnection, Repository } from 'typeorm'
import { Car } from '../entity/Car'

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
  async findByUserId (userId: number) {
    const foundCar = await getConnection()
      .createQueryBuilder(Car, 'vehicle')
      .where('vehicle.userId = :userId', { userId })
      .getOne()
    // console.log('foundcar: ' + foundCar)
    return foundCar
  }

  async findByMakeModel (make: string, model: string) {
    const foundCar = await getConnection()
      .createQueryBuilder(Car, 'vehicle')
      .where('vehicle.make = :make', { make })
      .andWhere('vehicle.model = :model', { model })
      .getOne()
    // console.log('foundcar: ' + foundCar)
    return foundCar
  }

  async deleteCar (make: string, model: string) {
    const removeCar = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Car)
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .execute()
    return removeCar
  }

  async createCar (lease: boolean, seats: number, year: number, make: string, model: string, trim: string, specs: string, userId: number) {
    let car: any
    try {
      car = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Car)
        .values([
          { lease, seats, year, make, model, trim, specs, userId }
        ])
        .execute() // .catch
    } catch {
      return 'could not insert car data'
    }
    return car
  }
}
