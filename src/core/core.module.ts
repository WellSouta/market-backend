import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { resolve } from 'node:path'

import appConfiguration from '../common/configuration/app.configuration'
import authConfiguration from '../common/configuration/auth.configuration'
import databaseConfiguration, {
  type IDatabaseConfiguration
} from '../common/configuration/database.configuration'
import { ConfigurationType } from '../common/constants/configurations'
import { ProviderType } from '../common/constants/providers'
import { TransformToPlainInterceptor } from './interceptors/transform-to-plain.interceptor'

@Global()
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
          entities: [resolve(__dirname, '../entities/*.entity.{ts,js}')]
        }
      }
    })
  ],
  providers: [{ provide: ProviderType.AppInterceptor, useClass: TransformToPlainInterceptor }]
})
export class CoreModule {}
