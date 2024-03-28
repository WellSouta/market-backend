import { ConfigurationType } from '../../common/constants/configurations'

export interface IAuthConfiguration {
  secret: string
  expiresIn: number
}

export default function authConfiguration(): {
  [ConfigurationType.Auth]: IAuthConfiguration
} {
  return {
    [ConfigurationType.Auth]: {
      secret: process.env.AUTH_SECRET,
      expiresIn: Number(process.env.AUTH_EXPIRES_IN)
    }
  }
}
