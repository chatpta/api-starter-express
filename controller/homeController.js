'use strict';
const getRequestHandler = ( req, res, next ) => res.send( { message: 'home get response' } );

const postRequestHandler = ( req, res, next ) => res.send( { message: 'home post response' } );

const patchRequestHandler = ( req, res, next ) => res.send( { message: 'home patch response' } );

const deleteRequestHandler = ( req, res, next ) => res.send( { message: 'home delete response' } );

module.exports = {
    getRequestHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}
