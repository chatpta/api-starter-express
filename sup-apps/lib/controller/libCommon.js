'use strict';

/**
 * This file contains functions common to all controllers.
 */

const validate = require( "@chatpta/validate" );
const error = require( "@chatpta/common-util" ).error;

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
        error.throwRecordNotFoundError();
    }
}

function _verifyObjectProperties( obj, arrayOfProperties ) {
    let returnObj = {};

    arrayOfProperties.forEach( nameOfProperty => {
        if ( obj?.[ nameOfProperty ] ) {
            returnObj[ nameOfProperty ] = obj?.[ nameOfProperty ];
        }
    } );

    return returnObj;
}

function _validateProperties( obj ) {
    let returnObj = {};

    for ( let [ key, value ] of Object.entries( obj || {} ) ) {

        switch ( key ) {
            case "first_name" :
            case "last_name" :
                validate.isCharactersString( value ) ? returnObj[ key ] = value : null;
                break;
            case "email" :
                validate.isEmailString( value ) ? returnObj[ key ] = value : null;
                break;
            case "phone_number":
                validate.isPhoneNumber( value ) ? returnObj[ key ] = value : null;
                break;
            case "token":
                validate.isUrlSafeString( value ) ?
                    returnObj[ key ] = value : null;
                break;
        }
    }

    return returnObj;
}


module.exports = {
    checkSuccess: _checkSuccess,
    _verifyObjectProperties,
    _validateProperties,
};
