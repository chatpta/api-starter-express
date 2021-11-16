'use strict';

/**
 * This is base class for all model classes.
 */
class ActiveRecord {
    constructor( DatabaseFactory ) {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._DatabaseFactory = DatabaseFactory;
    }

    async findById( id ) {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const user = await client.query( `
            SELECT *
            FROM ${ this._className }s
            WHERE ${ this._className }_id = '${ id }';
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return user;
    }

    save( object ) {
        return { record: this._className }
    }

    update( object ) {
        return { record: "HI I am here" }
    }

    delete() {
        return { record: "HI I am here" }
    }

    getQuery() {
        return this._DatabaseFactory.getDbQuery();
    }
}

module.exports = ActiveRecord;
