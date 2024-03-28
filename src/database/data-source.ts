import { resolve } from 'path'
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [resolve(__dirname, './entities/**/*.entity.{ts,js}')],
  migrations: [resolve(__dirname, './migrations/**/*.{ts,js}')]
})
