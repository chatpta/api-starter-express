'use strict';
const Item = require( './Item' );

/**
 * Factory for database functionality
 */
class ItemFactory {

    static getItem() {
        return new Item();
    }
}

module.exports = ItemFactory;
