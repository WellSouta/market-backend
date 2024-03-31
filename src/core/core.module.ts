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
import { InstanceToPlainInterceptor } from './interceptors/instance-to-plain.interceptor'
import { PlainToInstancePipe } from './pipes/plain-to-instance.pipe'
import { ValidationPipe } from './pipes/validation.pipe'

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
  providers: [
    { provide: ProviderType.AppPipe, useClass: PlainToInstancePipe },
    { provide: ProviderType.AppPipe, useClass: ValidationPipe },
    { provide: ProviderType.AppInterceptor, useClass: InstanceToPlainInterceptor }
  ]
})
export class CoreModule {}
