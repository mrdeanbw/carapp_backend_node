import { UserRepository } from '../repository/UserRepository'

const userRepo = new UserRepository()

export const getUser = async (email: string, password: string) => {
  console.log('from getUser.ts searching for: ' + email + ' and ' + password)

  const loginUser = await userRepo.findByEmailPass(email, password)

  console.log(`from getUser.ts: ${loginUser}`)

  return loginUser
}
