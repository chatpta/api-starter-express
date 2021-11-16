'use strict';
const { Item, User } = require( '../model' );

/**
 * Factory for database functionality
 */
class ModelFactory {

    static getUser( Database ) {
        if ( !this._user ) {
            this._user = new User( Database );
        }
        return this._user;
    }

    static getItem( Database ) {
        if ( !this._item ) {
            this._item = new Item( Database );
        }
        return this._item;
    }
}

module.exports = ModelFactory;
