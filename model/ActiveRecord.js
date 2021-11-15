'use strict';

/**
 * This is base class for all model classes.
 */
class ActiveRecord {
    constructor( dbConnection ) {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._dbConnection = dbConnection;
    }

    getById( id ) {
        return { record: "HI I am here" }
    }

    getByName( name ) {
        return { record: "HI I am here" }
    }

    saveInDb( object ) {
        return { record: this._className }
    }

    updateInDb( object ) {
        return { record: "HI I am here" }
    }

    deleteFromDb() {
        return { record: "HI I am here" }
    }
}

module.exports = ActiveRecord;
