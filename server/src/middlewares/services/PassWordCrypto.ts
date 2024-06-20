

import { compare, genSalt, hash} from 'bcrypt'

const SALT_RANDONS = 10

const hashPassword = async(password: string) =>{
  const saltGenerated = await genSalt(SALT_RANDONS)

  return await hash(password, saltGenerated)
}

const verifyPassword = async(password: string, hashPassword: string) =>{
  return await compare(password, hashPassword)
}

export const PasswordCrypto = {
  hashPassword,
  verifyPassword
}