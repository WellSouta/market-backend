# market-backend

my first project using nest.js

### Stack

| Category            | Tool                 | Packages                                                            | Reason                                        |
| ------------------- | -------------------- | ------------------------------------------------------------------- | --------------------------------------------- |
| Platform (Language) | Node.js (TypeScript) | [typescript](https://npm.im/typescript)                             | ToR requirements                              |
| Framework           | Nest.js (express)    | [@nestjs/platform-express](https://npm.im/@nestjs/platform-express) | ToR requirements                              |
| ORM (Database)      | TypeORM (PostgreSQL) | [@nestjs/typeorm](https://npm.im/@nestjs/typeorm)                   | ToR requirements                              |
| Authentication      | JWT                  | [@nestjs/jwt](https://npm.im/@nestjs/jwt)                           | ToR requirements                              |
| Password Hashing    | argon2               | [argon2](https://npm.im/argon2)                                     | More secure and modern alternative to bcrypt  |
| Data Validation     | class-validator      | [class-validator](https://npm.im/class-validator)                   | Easy to work with class-transformer           |
| Data Transformation | class-transformer    | [class-transformer](https://npm.im/class-transformer)               | Easy to work with TypeORM                     |
| API Documentation   | Swagger              | [@nestjs/swagger](https://npm.im/@nestjs/swagger)                   | ToR requirements                              |
| Testing             | Jest, supertest      | [@nestjs/testing](https://npm.im/@nestjs/testing)                   | ToR requirements                              |
| Linting             | ESLint               |                                                                     | ToR requirements, I usually don't use it      |
| Formatting          | Prettier             |                                                                     | ToR requirements, but also just a basic thing |

### TODO

- [x] Bootstrap using nest-cli;
- [x] Figure out how to make configurations and connection to the database;
- [x] Figure out how to use TypeORM's CLI;
- [x] Use class-transformer as [Interceptor](https://docs.nestjs.com/interceptors) to exclude private data/manipulate data on output;
- [ ] Use class-transformer as [Pipe](https://docs.nestjs.com/pipes) for DTOs;
- [ ] Use class-validator for input validation;
- [ ] Somehow sanitize input data;
- [ ] Handle exceptions using [Filters](https://docs.nestjs.com/exception-filters) and implement common interface for errors;
- [ ] Think about separating **authentication part to [Middlewares](https://docs.nestjs.com/middleware)**, leaving **authorization** only in [Guards](https://docs.nestjs.com/guards);
- [ ] Make `AppEnvironment` enum (production, staging, development, testing) and use it for different scenarious;
- [ ] Implement pagination;
- [ ] Figure out which fields I should index in database and optimize queries;
- [ ] ...127 more things to do
- [ ] Implement unit tests;
- [ ] Implement e2e tests.

## Running locally

### Requirements

- Docker and Docker Compose
- Node.js 18 or newer
- pnpm 8 or newer

### Steps:

1. Clone the repository and install dependencies:

```sh
$ git clone https://github.com/WellSouta/market-backend
$ cd market-backend
$ pnpm install
```

2. Configure application:

```sh
$ cp .env.example .env
$ vi .env
```

3. Build application:

```sh
$ pnpm build
```

4. Run services:

```sh
$ docker compose up -d
```

5. Synchronise database with entities:

```sh
$ pnpm db:cli schema:sync
```

6. That's it, you can start exploring.

```sh
$ pnpm start
# or
$ pnpm start:dev
```
