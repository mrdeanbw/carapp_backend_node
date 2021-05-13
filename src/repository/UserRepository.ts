import { EntityRepository, getConnection, Repository } from 'typeorm'
import { User } from '../entity/User'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByName(firstName: string, lastName: string) {
        return this.findOne({ firstName, lastName })
    }

    async findByEmail(email: string) {
        const foundUser = await getConnection()
            .createQueryBuilder(User, 'person')
            .where('person.email = :email', { email })
            .getOne()
        // console.log(`founduser: ${foundUser}`)
        return foundUser
    }

    async findByEmailPass(email: string, password: string) {
        const foundUser = await getConnection()
            .createQueryBuilder(User, 'person')
            .where('person.email = :email', { email })
            .andWhere('person.password = :password', { password })
            .getOne()
        // console.log(`founduser: ${foundUser}`)
        return foundUser
    }

    async createUser(email: string, password: string, firstName: string, lastName: string, license: number) {
        let user: any
        try {
            user = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([
                    { email, password, firstName, lastName, license },
                ])
                .execute() //.catch
        } catch {
            return 'could not create new user'
        }
        return user
    }

    async changeName(firstName: string, lastName: string, id: number) {
        const updateName = await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ firstName: firstName, lastName: lastName })
            .where('id = :id', { id })
            .execute()
        return updateName
    }

    async deleteUser(email: string) {
        const removeUser = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('email = :email', { email })
            .execute()
        return removeUser
    }

    async userCar(id: number) {
        const user = await getConnection()
            .createQueryBuilder(User, 'user')
            .innerJoinAndSelect('user.cars', 'photo')
            .where('user.id = :id', { id })
            .getOne()
        // console.log('what is : ' + user)
        return user
    }
}