# starter json api expressjs with postgres

To run application in docker compose

Start postgres database in container, available at host port 5432 

```shell
docker-compose -f docker-compose-pg-db.yaml up
```

Run application

```shell
 npm install
 npm run devstart
```

Run test

```shell
 npm run test
```

### Directory structure


Todo::

1. Setup postgres database in docker container.
2. Create and run migration to create development, test and production database.
3. Setup pg database connection and disconnect.
4. Setup logger to write log files.
5. Setup read configuration file.
6. Complete docker file to create api docker image.
7. Setup compose file to automatically build images.
8. Setup script to do all above.
