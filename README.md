NB : Project is in active development phase and should be used as a demonstration of the described concepts. 

## Kulu - GraphQL API Framework (NestJS, Apollo, Prisma)

GraphQL API implementation inspired by **Domain Driven Design** & **Clean Architecture**. It demonstrates **Inversion Of Control** through **Dependency Injection**  a **NodeJS** 

### Why Kulu?

**Kulu** exists to ensure that people working on **web backends, prototypes** can easily have a **base structure** that can have them going in a jiffy.

It's **simplistic**, and with it comes an implementation informed by different experiences & lessons learnt from using different frameworks and approaches when building web applications.

### Features

- **Extensible**  - Designed to allow easy addition of new capabilities & functionality.
- **GraphQL Support** - Default API interface is GraphQL leveraging apollo libraries.
- **Graph Federation** - Built as a **subgraph** that can be exposed via a **federated gateway** to enable building of applications as **microservices**.
- ++more

### Setup/Installation

#### Prerequisites.

- NodeJS installation (Tested on v18.12.1).
- Database (Tested with MySQL)(Since its using Prisma, any compatible database should be fine) ```docker-compose up -d```
- NestJS CLI ```npm install @nestjs/cli -g```

#### Installation steps.

1. Clone Kulu repository <br>```git clone https://github.com/timkatee/kulu.git```
2. Install dependencies <br>```npm install --legacy-peer-deps```
3. Create .env file in the root dir and add prisma database config, if mysql <br> ```DATABASE_URL='mysql://username:password@localhost:3306/database'```
```PRISMA_DATA_MODEL_PATH='./src/infrastructure/database/prisma/schema.prisma'```
4. Run migrations for database table creation, for an existing database with tables refer to [Prisma Documentation](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres) <br> ```npx prisma migrate dev```
5. Run the project <br> ```npm run start:dev```
6. Access the project on http://localhost:4000/graphql . Port might be different based on your .env PORT value.
7. Have fun









