'use strict';
const { Item, User } = require( '../model' );

/**
 * Factory for database functionality
 */
class ModelFactory {

    static getUser( DatabaseFactory ) {
        return new User( DatabaseFactory );
    }

    static getItem( DatabaseFactory ) {
        return new Item( DatabaseFactory );
    }
}

module.exports = ModelFactory;
