'use strict';
const User = require( './userModel' );

/**
 * Factory for database functionality
 */
class UserFactory {

    static getUser() {
        return new User();
    }
}

module.exports = UserFactory;
