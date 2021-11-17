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
        const record = await client.query( `
            SELECT *
            FROM ${ this._modelName }s
            WHERE ${ this._modelName }_id = '${ id }';
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }

    /**
     * Finds one random record
     * @return {Promise<*>}
     */
    async findOne() {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( `
            SELECT *
            FROM ${ this._modelName }s LIMIT 1;
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }

    async save( object ) {
        // Deconstruct the received object
        let [ keys, prompt, values ] = this.extractKeyPromptValueArrays( object );

        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( {
            // name: `save-${ this._modelName }`,
            text: `INSERT INTO ${ this._modelName }s (${ keys.join( ', ' ) })
                   VALUES (${ prompt.join( ', ' ) }) RETURNING *`,
            values: values
        } );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }

    async update( record_id, updatedObject ) {
        // Deconstruct the received object
        let [ keys, values ] = this.extractUpdateKeysValues( updatedObject );

        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( {
            // name: `update-${ this._modelName }`,
            text: `UPDATE ${ this._modelName }s
                   SET ${ keys.join( ', ' ) }
                   WHERE ${ this._modelName }_id=$1
                       RETURNING *`,
            values: [ record_id, ...values ]
        } );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
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

    extractUpdateKeysValues( object ) {
        let keys = [];
        let values = [];
        let number = 1;

        for ( let key of Object.keys( object ) ) {
            number += 1;
            keys.push( key.toString() + "=$" + number );
            values.push( object[ key ] );
        }

        return [ keys, values ];
    }
}

module.exports = ActiveRecord;
