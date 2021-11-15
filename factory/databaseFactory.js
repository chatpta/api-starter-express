'use strict';
const { query, getClient, pool} = require( '../db' );

/**
 * Factory for database functionality
 */
class DatabaseFactory {

    static getDbClient() {
        return getClient();
    }

    static getDbQuery() {
        return query;
    }

    static getDbPool() {
        return pool;
    }
}

module.exports = DatabaseFactory;
