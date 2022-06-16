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

const User = require( './userModelFactory' ).getUser();
const lib = require( '../lib/controller/libCommon' );
const UserLib = require( './libUserController' );

async function getRequestFirstNameHandler( req, res, next ) {

    await lib.validateReceivedObjectProperties( req?.query, [ 'first_name' ] )
        .then( validObj => User.findByFirstName( validObj?.first_name ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( savedUserDto => lib.createObjectToSend( savedUserDto, [ 'first_name' ] ) )
        .then( objectToSend => res?.send( ...objectToSend ) )
        .catch( next );
}

async function postRequestHandler( req, res, next ) {
    await lib.validateReceivedObjectProperties( req?.body?.user, [ 'first_name' ] )
        .then( validObj => User.save( validObj ) )
        .then( savedUserDto => lib.checkSuccess( savedUserDto, next ) )
        .then( savedUserDto => lib.createObjectToSend( savedUserDto, [ 'first_name' ] ) )
        .then( objectToSend => res?.send( ...objectToSend ) )
        .catch( next );
}

async function patchRequestHandler( req, res, next ) {
    await lib.validateReceivedObjectProperties( req?.body?.user, [ 'first_name' ] )
        .then( validObj => User.findByFirstName( validObj?.first_name ) )
        .then( foundUserDto => lib.checkSuccess( foundUserDto, next ) )
        .then( foundUserDto => lib.validateUpdatedObject( req?.body?.updated_user, [ 'first_name' ], foundUserDto ) )
        .then( ( { validatedObject, pass } ) => User.update( pass?.data[ 0 ]?.user_id, validatedObject ) )
        .then( updatedUserDto => lib.checkSuccess( updatedUserDto, next ) )
        .then( updatedUserDto => lib.createObjectToSend( updatedUserDto, [ 'first_name' ] ) )
        .then( objectToSend => res?.send( ...objectToSend ) )
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
