'use strict';
const Model = require( './modelFactory' );
const { DbRecord } = require( '../interfaces' );

module.exports = {
    User: Model.getUser(),
    Item: Model.getItem(),
    DbRecord: DbRecord
}
