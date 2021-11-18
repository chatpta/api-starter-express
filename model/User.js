'use strict';
const ActiveRecord = require( './ActiveRecord/ActiveRecord' );
const Dto = require( "../interfaces" );


class User extends ActiveRecord {

    constructor() {
        super();
    }

    async findByFirstName( name ) {
        const dto = await Dto.getDTO();

        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const user = await client.query( `
            SELECT *
            FROM ${ this._className }s
            WHERE first_name = '${ name }';
        ` );

        // Create data transfer object ( Interface )
        if ( user.rowCount >= 1 ) {
            dto.success = true;
            dto.length = user?.rowCount;
            dto.record = user?.rows;
        }

        // Release client ( necessary )
        await client.release();

        // Return result
        return dto;
    }
}

module.exports.User = User;
