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
        .then( user => {
            res.send( user.rows[ 0 ] );
        } )
        .catch( error => next( new Error( error ) ) );
}

function postRequestHandler( req, res, next ) {
    res.send( { message: 'user post response' } );
}

function patchRequestHandler( req, res, next ) {
    res.send( { message: 'user patch response' } );
}

function deleteRequestHandler( req, res, next ) {
    res.send( { message: 'user delete response' } );
}

