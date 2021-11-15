# starter json api expressjs with postgres

To create a copy of this app run

```shell
npx @chatpta/starter-api-express my-api
```

To run application in docker compose,

Express runs at localhost:3000 and postgres runs at localhost:5432

```shell
docker-compose -f docker-compose.yaml up
```

Start postgres database in container, available at host port 5432

```shell
docker-compose up db-starter-api-express
```

Test connect to db

```shell
psql "postgresql://user:password@localhost/chatpta_db"
```

Run application

```shell
 npm install
 npm run devstart
```

Run test in watch mode with postgres db connection

```shell
 npm run test
```

Run test in watch mode WITHOUT postgres db connection

```shell
 npm run testWithoutDb
```

Run the build script to do all of above

```shell
 ./build
```

Run database migration to create database tables

```shell
 npm run migrateDb
```

### Directory structure

Todo::

2. Create and run migration to create development, test and production database.
3. Setup pg database connection and disconnect.
