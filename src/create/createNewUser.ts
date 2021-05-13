import { UserRepository } from '../repository/UserRepository'
// import bcrypt from 'bcryptjs'

export const createNewUser = async (email: string, password: string, firstName: string, lastName: string, license: number) => {
  console.log('createNewUser called')

  const userRepo = new UserRepository()

  // validate
  if (await userRepo.findByEmail(email)) {
    return 'Username/Email: ' + email + ' is already taken'
  }

  // hash password
  // if (password) {
  //     password = bcrypt.hashSync(password, 10)
  // }

  const newUser = email && password ? await userRepo.createUser(email, password, firstName, lastName, license) : 'email and password cannot be empty'
  console.log('from createUser.ts ' + newUser)

  return newUser
}
