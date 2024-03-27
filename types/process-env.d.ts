declare namespace NodeJS {
  interface ProcessEnv {
    APP_HOST: string
    APP_PORT: string

    AUTH_SECRET: string
    AUTH_EXPIRES_IN: string

    DB_HOST: string
    DB_PORT: string
    DB_NAME: string
    DB_USERNAME: string
    DB_PASSWORD: string
  }
}
