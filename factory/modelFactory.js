'use strict';
const { Item, User } = require( '../model' );

/**
 * Factory for database functionality
 */
class ModelFactory {

    static getUser( Database ) {
        return new User( Database )
    }

    static getItem( Database ) {
        if ( !this._item ) {
            this._item = new Item( Database );
        }
        return this._item;
    }
}

module.exports = ModelFactory;
