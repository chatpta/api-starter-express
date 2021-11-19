'use strict';

/**
 * This is base class for all model classes.
 * This class provides database clients and few basic functions.
 */
const Db = require( '../../db' );
const lib = require( './lib/lib' );

class ActiveRecord {
    constructor() {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._DatabaseFactory = Db;
        this._sqlQueryRunner = Db.getSqlQueryRunner();
        this._modelName = this._className;
    }

    /**
     * Finds data by its id
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
     * Finds one random data
     * @return {Promise<*>}
     */
    async findOne() {
        // Build query
        const query = lib._findOneQueryBuilder( this._modelName );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    async findLastTen() {
        // Build query
        const query = lib._findLastTenQueryBuilder( this._modelName );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Saves the data
     * @param object
     * @return {Promise<*>}
     */
    async save( object ) {
        // Build query
        const query = lib._saveQueryBuilder( object, this._modelName );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Update data
     * @param record_id
     * @param updatedObject
     * @return {Promise<*>}
     */
    async update( record_id, updatedObject ) {
        // Build query
        const query = lib._updateQueryBuilder( record_id, updatedObject, this._modelName );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Delete data by id
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
