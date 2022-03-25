# starter json api expressjs with postgres

### Create my-api application

```shell
npx @chatpta/starter-api-express my-api
```

### Before running application make sure

system has
```node 16.4 or higher```
```docker 3.6.0 or higher```

create ```my-api/.env``` file and paste the content of ```my-api/dev.env``` into this file.

### Run postgres database in container and application on local machine in development mode

Docker runs on ```localhost:5400``` and express api runs on ```localhost:3000```

```shell
docker-compose up db-starter-api-express
npm install
npm run migrateDb
npm run devstart
```

### To run application and database both using docker compose

Express runs at ```localhost:3000``` and postgres runs at ```localhost:5400```

```shell
docker-compose -f docker-compose.yaml up
```

### Other commands

Test connection to db need ```psql``` client installed on machine

```shell
psql "postgresql://user:password@localhost:5400/chatpta_db"
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

Seed database with some data

```shell
 npm run seedDb
```

Check test coverage

```shell
 npm run testCoverage
```

# Directory structure

## bin

Contains express entry point script www, this script runs in response to ```npm run start``` and ```npm run devstart```

## common-middleware

Application wide middleware, like error handlers and loggers.

## config

Configuration file, which does not change frequently. Should not include password or database names etc..

## controller

Name is self-explanatory. Controller files should not define functions, but should only call functions. Definition of
functions should be in the ```controller/lib``` directory.

## db

All database connection and related files. In the main application should be used only in ```ActiveRecord.js``` module.
Other places it can be used is in migration and seed scripts.

## factory

Factory creates the objects and supplies to the modules dependent on them.

## interfaces

Interfaces on which other modules are dependent for sending messages to each other.

## lib

Library of application functions.

## logs

Application log files, one file each day.

## model

All models.

## routes

All routes.

## secrets

All secret keys.

## test

All application tests. Each test file correspond to a file of same name. For example ```user.test.js``` tests ```user.js``` file.
