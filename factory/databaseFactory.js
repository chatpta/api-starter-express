const { query, getClient, pool } = require( '../db' );

/**
 * Factory for database functionality
 */
class DatabaseFactory {

    getDbClient() {
        return getClient();
    }

    getDbQuery() {
        return query();
    }

    getDbPool() {
        return pool;
    }
}

module.exports = DatabaseFactory;
