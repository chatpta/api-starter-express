#!/bin/sh

# Test without database
export DB_CONN=none
export NODE_ENV=test
mocha --reporter spec --bail --check-leaks test/**/*.test.js
# Reset environment variables
export DB_CONN=''

#Todo::Test if docker-compose is available
# Start database
docker-compose up -d db-starter-api-express
#Todo::Wait till db is ready
#Todo::Test if psql is available

# Test database connection
psql "postgresql://user:password@localhost/chatpta_db"

# Test with database
export NODE_ENV=test
mocha --reporter spec --bail --check-leaks test/**/*.test.js

# Reset environment variables
npm run export NODE_ENV=production

# Build and run application
docker-compose up
