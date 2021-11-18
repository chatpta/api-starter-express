'use strict';
module.exports = {
    getRequestHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}

const { User } = require( '../factory' );

async function getRequestHandler( req, res, next ) {
    await User.findByFirstName( req.query.first_name )
        .then( user => res.send( user.record[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

async function postRequestHandler( req, res, next ) {
    await User.save( req.body.user )
        .then( user => res.send( user.record[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

async function patchRequestHandler( req, res, next ) {
    await User.findByFirstName( req.body.user.first_name )
        .then( user => User.update( user.record[ 0 ].user_id, req.body.updated_user ) )
        .then( user => res.send( user.record[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

async function deleteRequestHandler( req, res, next ) {
    await User.findByFirstName( req.body.user.first_name )
        .then( user => User.delete( user.record[ 0 ].user_id ) )
        .then( user => res.send( user.record[ 0 ] ) )
        .catch( error => next( new Error( error ) ) );
}

