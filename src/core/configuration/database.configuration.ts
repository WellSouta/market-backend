import { ConfigurationType } from '../../common/constants/configurations'

export interface IDatabaseConfiguration {
  host: string
  port: number
  name: string
  username: string
  password: string
}

export default function databaseConfiguration(): {
  [ConfigurationType.Database]: IDatabaseConfiguration
} {
  return {
    [ConfigurationType.Database]: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      name: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  }
}
