'use strict';
const getRequestHandler = ( req, res, next ) => res.send( { message: 'Private get response' } );

const postRequestHandler = ( req, res, next ) => res.send( { message: 'Private post response' } );

const patchRequestHandler = ( req, res, next ) => res.send( { message: 'Private patch response' } );

const deleteRequestHandler = ( req, res, next ) => res.send( { message: 'Private delete response' } );

module.exports = {
    getRequestHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}

