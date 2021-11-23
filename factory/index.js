'use strict';

/**
 * Modules exported from here implement factory pattern.
 * All modules, which might be connected to more than one other module should connect through factory.
 * @type {ModelFactory}
 */
const Model = require( './modelFactory' );
const CommonMiddleware = require( '../common-middleware' );

module.exports = {
    User: Model.getUser(),
    Item: Model.getItem(),
    CommonMiddleware: CommonMiddleware
}
