'use strict';

/**
 * Modules exported from here implement factory pattern.
 * All modules, which might be connected to more than one other module should connect through factory.
 * @type {ModelFactory}
 */
const Model = require( './modelFactory' );

module.exports = {
    Item: Model.getItem()
}
