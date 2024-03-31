import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { IAuthConfiguration } from '../../common/configuration/auth.configuration'
import { ConfigurationType } from '../../common/constants/configurations'
import { ProviderType } from '../../common/constants/providers'
import { UserModule } from '../users/user.module'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get<IAuthConfiguration>(ConfigurationType.Auth)!

        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expiresIn
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: ProviderType.AppGuard, useClass: AuthGuard }],
  exports: [AuthService]
})
export class AuthModule {}
