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

    findById( id ) {
        return { record: "HI I am here" }
    }

    findByName( name ) {
        return { record: "HI I am here" }
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

    getQuery( ) {
        return this._DatabaseFactory.getDbQuery();
    }
}

module.exports = ActiveRecord;
