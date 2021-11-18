'use strict';
const Model = require( './modelFactory' );
const DTO = require( './dtoFactory' );
const CommonMiddleware = require( '../common-middleware' );

module.exports = {
    User: Model.getUser(),
    Item: Model.getItem(),
    DTO: DTO.getDTO(),
    CommonMiddleware: CommonMiddleware

}
