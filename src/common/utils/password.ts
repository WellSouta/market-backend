import { argon2id, hash, verify } from 'argon2'

export async function hashPassword(plain: string): Promise<string> {
  return hash(plain, {
    type: argon2id,
    hashLength: 64
  })
}

export function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  return verify(hashed, plain)
}
