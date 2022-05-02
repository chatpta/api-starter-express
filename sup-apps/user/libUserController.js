'use strict';

const error = require( "@chatpta/common-util" ).error;

/**
 * This file contains functions of User controller.
 */

function checkFirstname( req ) {

    return new Promise( function ( resolve, reject ) {

        if ( req?.query?.first_name ) {
            resolve( req?.query?.first_name );
        } else {
            error.throwValidationFailureError();
        }
    } );
}

function checkUser( req ) {

    return new Promise( function ( resolve, reject ) {

        if ( req?.body?.user ) {
            resolve( req?.body?.user );
        } else {
            error.throwValidationFailureError();
        }
    } );
}

module.exports = {
    checkFirstname,
    checkUser
};
