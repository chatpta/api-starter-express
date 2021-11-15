'use strict';
const { Item, User } = require( '../model' );

/**
 * Factory for database functionality
 */
class ModelFactory {

    static getUser() {
        if ( !this._user ) {
            this._user = new User();
        }
        return this._user;
    }

    static getItem() {
        if ( !this._item ) {
            this._item = new Item();
        }
        return this._item;
    }
}

module.exports = ModelFactory;
