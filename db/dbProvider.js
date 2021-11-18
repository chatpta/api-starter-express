'use strict';
const { query, getClient, sqlQueryRunner,  pool} = require( './dbConnection' );

/**
 * Factory for database functionality
 */
class DbProvider {

    static getDbClient() {
        return getClient();
    }

    static getDbQuery() {
        return query;
    }

    static getDbPool() {
        return pool;
    }

    static getSqlQueryRunner() {
        return sqlQueryRunner;
    }
}

module.exports = DbProvider;
