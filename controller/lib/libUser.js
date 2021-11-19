'use strict';

/**
 * This file contains functions of User controller.
 */

function checkFirstname( req ) {

    return new Promise( function ( resolve, reject ) {

        if ( req?.query?.first_name ) {
            resolve( req?.query?.first_name );
        } else {
            reject( null );
        }
    } );
}

module.exports = { checkFirstname };
