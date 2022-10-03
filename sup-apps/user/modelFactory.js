'use strict';
const { User } = require( './model' );

/**
 * Factory for database functionality
 */
class ModelFactory {

    static getUser() {
        return new User();
    }
}

module.exports = ModelFactory;
