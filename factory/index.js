'use strict';
const Model = require( './modelFactory' );
const DTO = require( './dtoFactory' );

module.exports = {
    User: Model.getUser(),
    Item: Model.getItem(),
    DTO: DTO.getDTO()
}
