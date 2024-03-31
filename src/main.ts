import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { IAppConfiguration } from './common/configuration/app.configuration'
import { ConfigurationType } from './common/constants/configurations'

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const appConfig = configService.get<IAppConfiguration>(ConfigurationType.App)!

  // prettier-ignore
  await Promise.all([
    setupSwagger(app),
    app.listen(appConfig.port, appConfig.host)
  ])

  console.log(`Application is running on ${await app.getUrl()}`)

  return app
}

async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Marketplace')
    .setVersion('0.1')
    .setLicense('MIT', 'https://opensource.org/license/mit')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      'x-tokenName': 'Bearer',
      bearerFormat: 'JWT'
    })
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('swagger', app, document)
}

bootstrap()
  .then(async (app) => {
    // prettier-ignore
    async function gracefulShutdown() {
      console.log('Shutting down...')
      try {
        await Promise.allSettled([
          app.close()
        ])
      } finally {
        console.log('Goodbye!')
        process.exit(0)
      }
    }

    for (const signal of ['SIGTERM', 'SIGINT'] as NodeJS.Signals[]) {
      process.on(signal, gracefulShutdown)
    }

    process.on('uncaughtException', (error, origin) => {
      console.error('Uncaught exception:', {
        error,
        origin
      })
    })

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled rejection:', {
        reason,
        promise
      })
    })
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
