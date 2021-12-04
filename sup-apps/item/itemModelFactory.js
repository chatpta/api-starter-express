'use strict';
const { Item } = require( './itemModel' );

/**
 * Factory for database functionality
 */
class ItemMoodelFactory {

    static getItem() {
        return new Item();
    }
}

module.exports = ItemMoodelFactory;
