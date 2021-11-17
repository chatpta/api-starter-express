'use strict';
const DatabaseFactory = require( '../../factory/databaseFactory' );
const lib = require( './lib/lib' );

/**
 * This is base class for all model classes.
 */
class ActiveRecord {
    constructor() {
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
        // Build query
        const query = lib._findByIdQueryBuilder( id, this._modelName );

        // Query database
        return await this.asyncClientQueryRun( query );
    }

    /**
     * Finds one random record
     * @return {Promise<*>}
     */
    async findOne() {
        // Query database
        const query = `
            SELECT *
            FROM ${ this._modelName }s LIMIT 1;
        `;

        return await this.asyncClientQueryRun( query );
    }

    /**
     * Saves the record
     * @param object
     * @return {Promise<*>}
     */
    async save( object ) {
        // Deconstruct the received object
        let [ keys, prompt, values ] = lib._extractKeyPromptValueArrays( object );

        // Query database
        const query = {
            // name: `save-${ this._modelName }`,
            text: `INSERT INTO ${ this._modelName }s (${ keys.join( ', ' ) })
                   VALUES (${ prompt.join( ', ' ) }) RETURNING *`,
            values: values
        };

        return await this.asyncClientQueryRun( query );
    }

    /**
     * Update record
     * @param record_id
     * @param updatedObject
     * @return {Promise<*>}
     */
    async update( record_id, updatedObject ) {
        // Deconstruct the received object
        let [ keys, values ] = lib._extractUpdateKeysValues( updatedObject );

        // Query database
        const query = {
            // name: `update-${ this._modelName }`,
            text: `UPDATE ${ this._modelName }s
                   SET ${ keys.join( ', ' ) }
                   WHERE ${ this._modelName }_id=$1
                       RETURNING *`,
            values: [ record_id, ...values ]
        };

        return await this.asyncClientQueryRun( query );
    }

    /**
     * Delete record by id
     * @param record_id
     * @return {Promise<*>}
     */
    async delete( record_id ) {
        // Query database
        const query = {
            // name: `delete-${ this._modelName }`,
            text: `DELETE
                   FROM ${ this._modelName }s
                   WHERE ${ this._modelName }_id=$1
                       RETURNING *`,
            values: [ record_id ]
        };

        return await this.asyncClientQueryRun( query );
    }

    /**
     * Runs query on checked out client asynchronously.
     * Client is release after each run, otherwise all clients will be exhausted.
     * @param query
     * @return {Promise<*>}
     */
    async asyncClientQueryRun( query ) {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( query );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }
}

module.exports = ActiveRecord;
