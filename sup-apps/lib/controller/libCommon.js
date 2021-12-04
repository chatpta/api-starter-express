'use strict';

/**
 * This file contains functions common to all controllers.
 */

const validate = require( "@chatpta/validate" );

/**
 * Skips the route if does not receive data in dto
 * @param dto
 * @param next
 * @return {{success}|*}
 */
function _checkSuccess( dto, next ) {
    if ( dto?.success ) {
        return dto;
    } else {
        next( 'route' );
    }
}

function _verifyObjectProperties( obj, arrayOfProperties ) {
    let returnObj = {};

    arrayOfProperties.forEach( nameOfProperty => {
        if ( obj.hasOwnProperty( nameOfProperty ) ) {
            returnObj[ nameOfProperty ] = obj[ nameOfProperty ];
        }
    } );

    return returnObj;
}

function _validateProperties( obj ) {
    let returnObj = {};

    for ( let [ key, value ] of Object.entries( obj ) ) {

        switch ( key ) {
            case "first_name" :
            case "last_name" :
                validate.isCharactersString( value ) ? returnObj[ key ] = value : null;
                break;
            case "email" :
                validate.isEmailString( value ) ? returnObj[ key ] = value : null;
                break;
            case "phone_number":
                _isPhoneNumber( value ) ? returnObj[ key ] = value : null;
                break;
        }
    }

    return returnObj;
}

function _isPhoneNumber( str ) {
    if ( str === undefined || typeof str !== "string" || str.length === 0 ) return false;
    return ( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test( str ) );
}

function _throwValidationFailureError() {
    throw new Error( "Validation_Failure" );
}

module.exports = {
    checkSuccess: _checkSuccess,
    _verifyObjectProperties,
    _validateProperties,
    _isPhoneNumber,
    throwValidationFailureError: _throwValidationFailureError
};
