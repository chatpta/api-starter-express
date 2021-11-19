'use strict';

/**
 * This file should only call functions, all functions specific to ItemsController should be defined in ./lib/libUser.js.
 */
module.exports = {
    getRequestHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}

const { User } = require( '../factory' );
const lib = require( './lib/libCommon' );

async function getRequestHandler( req, res, next ) {
    await User.findByFirstName( req.query.first_name )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res.send( user.data[ 0 ] ) )
        .catch( next );
}

async function postRequestHandler( req, res, next ) {
    await User.save( req.body.user )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res.send( user.data[ 0 ] ) )
        .catch( next );
}

async function patchRequestHandler( req, res, next ) {
    await User.findByFirstName( req.body.user.first_name )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => User.update( user.data[ 0 ].user_id, req.body.updated_user ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res.send( user.data[ 0 ] ) )
        .catch( next );
}

async function deleteRequestHandler( req, res, next ) {
    await User.findByFirstName( req.body.user.first_name )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => User.delete( user.data[ 0 ].user_id ) )
        .then( user => lib.checkSuccess( user, next ) )
        .then( user => res.send( user.data[ 0 ] ) )
        .catch( next );
}
