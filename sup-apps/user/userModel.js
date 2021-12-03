'use strict';

/**
 * This class executes functions for the User Model
 */
const ActiveRecord = require( '../../model/ActiveRecord/ActiveRecord' );
const libUser = require("./libUserModel");


class User extends ActiveRecord {

    async findByFirstName( name ) {
        // Build Query
        const query = libUser._findByFirstNameQueryBuilder(name, this._className);

        // Query Database
        return await this._sqlQueryRunner( query );
    }
}

module.exports.User = User;
