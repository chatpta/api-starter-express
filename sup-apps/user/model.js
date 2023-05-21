'use strict';

/**
 * This class executes functions for the User Model
 */
const ActiveRecord = require( '../../model' );
const libUser = require("./modelQueries");


class User extends ActiveRecord {

    async findByFirstName( name ) {
        // Build Query
        const query = libUser._findByFirstNameQueryBuilder(name, this._tableName);

        // Query Database
        return await this._sqlQueryRunner( query );
    }
}

module.exports.User = User;
