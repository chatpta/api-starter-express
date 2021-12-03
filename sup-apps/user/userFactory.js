'use strict';
const User = require( './User' );

/**
 * Factory for database functionality
 */
class UserFactory {

    static getUser() {
        return new User();
    }
}

module.exports = UserFactory;
