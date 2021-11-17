'use strict';
const { Item, User } = require( '../model' );

/**
 * Factory for database functionality
 */
class ModelFactory {

    static getUser() {
        return new User();
    }

    static getItem() {
        return new Item();
    }
}

module.exports = ModelFactory;
