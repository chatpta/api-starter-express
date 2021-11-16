'use strict';
const ActiveRecord = require( './ActiveRecord' );


class User extends ActiveRecord {

    constructor( DatabaseFactory ) {
        super( DatabaseFactory );
    }

    async findByFirstName( name ) {
        const client = await this._DatabaseFactory.getDbClient()
        const user = client.query( `
            SELECT *
            FROM ${ this._className }s
            WHERE first_name = '${ name }';
        ` );
        await client.release();
        return user;
    }

    findFirstUser() {
        return { name: "Peter" }
    }
}

module.exports.User = User;
