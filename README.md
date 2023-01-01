# Complete App

## Description

Rest API using TypeScript, NestJS, Prisma, PostgreSQL, PostGIS.

## Installation

```bash
pnpm install
```

## ⚙ Configuration

Create a `.env` file. Take `.env.dev` file as base.

### Create a PostgreSQL database with Docker (Optional)

Run the following command:

```
docker run --name postgresql -p 5432:5432 -e POSTGRES_PASSWORD=abcd1234 -e POSTGRES_DB=complete-app -d postgres:14
```

### Create a `.env` file.

Take the `.env.dev` file as base.

```
DATABASE_URL="postgres://postgres:abcd1234@localhost:5432/complete-app"
```

### 🗄 Database migrations

- Every time the prisma schema changes (e.g. when a model is added/modified), run to update the Prisma Client:

  ```bash
  pnpm prisma generate
  ```

  `prisma generate` is automatically invoked when you're installing the `@prisma/client` npm package or when creating migration files. So it can skipped when installing dependencies for the first time.

- To generate and apply migrations (i.e. create database and tables):

  ```bash
  pnpm db:migrate
  ```

  The previous command should be run when setting up the dev environment for the first time.

- To manually seed the database, run:

  ```bash
  pnpm db:seed
  ```

## ▶ Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## 🧪 Test

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## License

Unlicensed.
