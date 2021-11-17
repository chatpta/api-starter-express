'use strict';
module.exports = {
    getRequestHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}

const { User } = require( '../factory' );

async function getRequestHandler( req, res, next ) {
    await User.findByFirstName( "Pankaj" )
        .then( user => res.send( user.rows[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

async function postRequestHandler( req, res, next ) {
    await User.save( { first_name: "Somebody" } )
        .then( user => res.send( user.rows[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

async function patchRequestHandler( req, res, next ) {
    await User.findByFirstName( "Somebody" )
        .then( user => User.update( user.rows[ 0 ].user_id, { first_name: "Updated somebody" } ) )
        .then( user => res.send( user.rows[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

async function deleteRequestHandler( req, res, next ) {
    await User.findByFirstName( "Updated somebody" )
        .then( user => User.delete( user.rows[ 0 ].user_id ) )
        .then( user => res.send( user.rows[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

