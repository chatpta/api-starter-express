'use strict';
const Model = require( './modelFactory' );
const CommonMiddleware = require( '../common-middleware' );

module.exports = {
    User: Model.getUser(),
    Item: Model.getItem(),
    CommonMiddleware: CommonMiddleware

}
