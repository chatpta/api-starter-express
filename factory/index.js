'use strict';
const Database = require( './databaseFactory' );
const Model = require( './modelFactory' );

module.exports = {
    User: Model.getUser( Database ),
    Item: Model.getItem( Database )
}
