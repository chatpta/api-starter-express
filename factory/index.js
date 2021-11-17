'use strict';
const Model = require( './modelFactory' );

module.exports = {
    User: Model.getUser(),
    Item: Model.getItem()
}
