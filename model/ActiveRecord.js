'use strict';

/**
 * This is base class for all model classes.
 */
class ActiveRecord {
    constructor( DatabaseFactory ) {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._DatabaseFactory = DatabaseFactory;
        this._modelName = this._className;
    }

    /**
     * Finds record by its id
     * @param id
     * @return {Promise<*>}
     */
    async findById( id ) {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const user = await client.query( `
            SELECT *
            FROM ${ this._modelName }s
            WHERE ${ this._modelName }_id = '${ id }';
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return user;
    }

    /**
     * Finds one random record
     * @return {Promise<*>}
     */
    async findOne() {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const user = await client.query( `
            SELECT *
            FROM ${ this._modelName }s LIMIT 1;
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return user;
    }

    async save( object ) {
        // Deconstruct the received object
        let [ keys, prompt, values ] = this.extractKeyPromptValueArrays( object );

        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const user = await client.query( {
            name: `save-${ this._modelName }`,
            text: `INSERT INTO ${ this._modelName }s (${ keys.join( ', ' ) })
                   VALUES (${ prompt.join( ', ' ) }) RETURNING *`,
            values: values
        } );

        // Release client ( necessary )
        await client.release();

        // Return result
        return user;
    }

    async update( user_id, updatedUser ) {
        return user_id;
    }

    delete() {
        return { record: "HI I am here" }
    }

    // Private methods
    extractKeyPromptValueArrays( object ) {
        let keys = [];
        let values = [];
        let prompt = [];
        let number = 0;

        for ( let key of Object.keys( object ) ) {
            number += 1;
            keys.push( key );
            values.push( object[ key ] );
            prompt.push( `$${ number }` )
        }

        return [ keys, prompt, values ];
    }
}

module.exports = ActiveRecord;
