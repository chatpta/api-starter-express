'use strict';
const ActiveRecord = require( './ActiveRecord' );


class User extends ActiveRecord {

    constructor( DatabaseFactory ) {
        super( DatabaseFactory );
    }

    async findByFirstName( name ) {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const user = await client.query( `
            SELECT *
            FROM ${ this._className }s
            WHERE first_name = '${ name }';
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return user;
    }

    findFirstUser() {
        return { name: "Peter" }
    }
}

module.exports.User = User;
