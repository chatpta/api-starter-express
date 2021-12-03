'use strict';

/**
 * This file should only call functions, all functions specific to ItemsController should be defined in ./lib/libItem.js.
 */
module.exports = {
    getRequestHandler,
    postRequestHandler,
    patchRequestHandler,
    deleteRequestHandler,
}

const { Item } = require( '../../factory' );
const lib = require( "../../lib/controller/libCommon" );

async function getRequestHandler( req, res, next ) {
    await Item.findById( req?.query?.item_id )
        .then( item => lib.checkSuccess( item, next ) )
        .then( item => res?.send( item?.data[ 0 ] ) )
        .catch( next );
}

async function postRequestHandler( req, res, next ) {
    await Item.save( req?.body?.item )
        .then( item => lib.checkSuccess( item, next ) )
        .then( item => res?.send( item?.data[ 0 ] ) )
        .catch( next );
}

async function patchRequestHandler( req, res, next ) {
    await Item.findById( req?.body?.item?.item_id )
        .then( item => lib.checkSuccess( item, next ) )
        .then( item => Item.update( item?.data[ 0 ]?.item_id, req?.body?.updated_item ) )
        .then( item => lib.checkSuccess( item, next ) )
        .then( item => res?.send( item?.data[ 0 ] ) )
        .catch( next );
}

async function deleteRequestHandler( req, res, next ) {
    await Item.delete( req?.body?.item?.item_id )
        .then( item => lib.checkSuccess( item, next ) )
        .then( item => res?.send( item?.data[ 0 ] ) )
        .catch( next );
}

