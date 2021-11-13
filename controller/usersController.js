'use strict';
module.exports = {
    getRequestHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}

function getRequestHandler( req, res, next ) {
    res.send( { message: 'user get response' } );
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

