'use strict';
const { Item } = require( './itemModel' );

/**
 * Factory for database functionality
 */
class ItemModelFactory {

    static getItem() {
        return new Item();
    }
}

module.exports = ItemModelFactory;
