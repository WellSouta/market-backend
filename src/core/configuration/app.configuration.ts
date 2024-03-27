import { ConfigurationType } from '../../common/constants/configurations'

export interface IAppConfiguration {
  host: string
  port: number
}

export default function appConfiguration(): {
  [ConfigurationType.App]: IAppConfiguration
} {
  return {
    [ConfigurationType.App]: {
      host: process.env.APP_HOST,
      port: Number(process.env.APP_PORT)
    }
  }
}
