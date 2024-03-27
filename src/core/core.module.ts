import { resolve } from 'node:path'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigurationType } from '../common/constants/configurations'
import { ProviderType } from '../common/constants/providers'

import appConfiguration from './configuration/app.configuration'
import authConfiguration from './configuration/auth.configuration'
import databaseConfiguration, {
  IDatabaseConfiguration
} from './configuration/database.configuration'
import { TransformToPlainInterceptor } from './interceptors/transform-to-plain.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration, authConfiguration, databaseConfiguration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get<IDatabaseConfiguration>(ConfigurationType.Database)!

        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          database: config.name,
          username: config.username,
          password: config.password,
          autoLoadEntities: true,
          entities: [resolve(__dirname, '../common/entities/**/*.entity.{ts,js}')],
          migrations: [resolve(__dirname, '../common/migrations/**/*.{js,ts}')]
        }
      }
    })
  ],
  // prettier-ignore
  providers: [
    { provide: ProviderType.AppInterceptor, useClass: TransformToPlainInterceptor }
  ]
})
export class CoreModule {}
