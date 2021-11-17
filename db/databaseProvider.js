'use strict';
const { query, getClient, sqlQueryRunner,  pool} = require( './db' );

/**
 * Factory for database functionality
 */
class DatabaseProvider {

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

module.exports = DatabaseProvider;
