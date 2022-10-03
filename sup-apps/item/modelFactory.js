'use strict';
const { Item } = require( './model' );

/**
 * Factory for database functionality
 */
class ModelFactory {

    static getItem() {
        return new Item();
    }
}

module.exports = ModelFactory;
