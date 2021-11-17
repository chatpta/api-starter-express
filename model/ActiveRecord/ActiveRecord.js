'use strict';
const Db = require( '../../db' );
const lib = require( './lib/lib' );

/**
 * This is base class for all model classes.
 */
class ActiveRecord {
    constructor() {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._DatabaseFactory = Db;
        this._sqlQueryRunner = Db.getSqlQueryRunner();
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
        return await this._sqlQueryRunner( query );
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

        return await this._sqlQueryRunner( query );
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

        return await this._sqlQueryRunner( query );
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

        return await this._sqlQueryRunner( query );
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

        return await this._sqlQueryRunner( query );
    }
}

module.exports = ActiveRecord;
