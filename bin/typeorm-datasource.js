const { NestFactory } = require('@nestjs/core')
const { getDataSourceToken } = require('@nestjs/typeorm')

const { AppModule } = require('../dist/app.module')

async function getDataSource() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false
  })

  /** @type {import('typeorm').DataSource} */
  const dataSource = app.get(getDataSourceToken())
  await dataSource.destroy()

  process.on('beforeExit', () => app.close())

  return dataSource
}

module.exports = {
  default: getDataSource()
}
