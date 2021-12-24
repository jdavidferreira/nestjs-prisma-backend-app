# Complete App

## Description

Rest API using TypeScript, NestJS, Prisma, PostgreSQL, PostGIS.

## Installation

```bash
yarn install
```

## ⚙ Configuration

Create a `.env` file. Take `.env.dev` file as base.

### Create a PostgreSQL database with Docker (Optional)

Run the following command:

```
docker run --name complete-app-db -p 5432:5432 -e POSTGRES_PASSWORD=abcd1234 -d postgres:14
```

### 🗄 Database migrations

```bash
yarn dlx prisma generate
```

## ▶ Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## 🧪 Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## License

Unlicensed.
