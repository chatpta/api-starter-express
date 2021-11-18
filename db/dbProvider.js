'use strict';
const { query, getClient, sqlQueryRunner, pool, endPool } = require( './dbConnection' );

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

    static getEndPool() {
        return endPool();
    }

    static getSqlQueryRunner() {
        return sqlQueryRunner;
    }
}

module.exports = DbProvider;
