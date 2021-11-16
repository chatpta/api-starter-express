'use strict';
const DatabaseFactory = require( './databaseFactory' );
const Model = require( './modelFactory' );

module.exports = {
    User: Model.getUser( DatabaseFactory ),
    Item: Model.getItem( DatabaseFactory )
}
