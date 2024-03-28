const { NestFactory } = require('@nestjs/core')
const { getDataSourceToken } = require('@nestjs/typeorm')

const { AppModule } = require('../dist/app.module')

async function getDataSource() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  })

  /** @type {import('typeorm').DataSource} */
  const dataSource = app.get(getDataSourceToken())
  await dataSource.destroy()

  return dataSource
}

module.exports = {
  default: getDataSource()
}
