'use strict';

/**
 * This file should only call functions, all functions specific to ItemsController should be defined in ./lib/libUser.js.
 */
module.exports = {
    getRequestFirstNameHandler,
    getRequestMostRecentHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}

const { User } = require( '../../factory' );
const lib = require( '../../controller/lib/libCommon' );
const UserLib = require( './libUser' );

async function getRequestFirstNameHandler( req, res, next ) {
    await UserLib.checkFirstname( req )
        .then( firstName => User.findByFirstName( firstName ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res?.send( user?.data[ 0 ] ) )
        .catch( next );
}

async function postRequestHandler( req, res, next ) {
    await UserLib.checkUser( req )
        .then( user => User.save( user ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res?.send( user?.data[ 0 ] ) )
        .catch( next );
}

async function patchRequestHandler( req, res, next ) {
    await UserLib.checkUser( req )
        .then( user => User.findByFirstName( user?.first_name ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => User.update( user?.data[ 0 ]?.user_id, req?.body?.updated_user ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res?.send( user?.data[ 0 ] ) )
        .catch( next );
}

async function deleteRequestHandler( req, res, next ) {
    await UserLib.checkUser( req )
        .then( user => User.findByFirstName( user?.first_name ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => User.delete( user?.data[ 0 ]?.user_id ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res?.send( user?.data[ 0 ] ) )
        .catch( next );
}

async function getRequestMostRecentHandler( req, res, next ) {
    await User.findLastTen()
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res?.send( user?.data ) )
        .catch( next );
}
