import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import appConfiguration from './common/configuration/app.configuration'
import authConfiguration from './common/configuration/auth.configuration'
import databaseConfiguration, {
  IDatabaseConfiguration
} from './common/configuration/database.configuration'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ApiModule } from './api/api.module'
import { ConfigurationType } from './common/constants/configurations'

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
          autoLoadEntities: true
        }
      }
    }),
    ApiModule
  ]
})
export class AppModule {}
