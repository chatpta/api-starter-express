'use strict';
const { User } = require( './userModel' );

/**
 * Factory for database functionality
 */
class UserModelFactory {

    static getUser() {
        return new User();
    }
}

module.exports = UserModelFactory;
