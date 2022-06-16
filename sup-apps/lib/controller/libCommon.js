'use strict';


const validate = require( "@chatpta/validate" ).validate;
const { stringUtilAuth } = require( "@chatpta/auth-util" );
const {
    throwValidationFailureError,
    throwRecordExistError,
    throwRecordNotFoundError
} = require( "@chatpta/common-util" ).error;
const { randomBytes } = require( "crypto" );


/***************************************
 * This file contains helper functions *
 ***************************************/

/**
 * If no data in dto
 * throw Record Not Found Error
 * */
function _checkSuccess( dto ) {
    if ( dto?.success ) {
        return dto;
    } else {
        throwRecordNotFoundError();
    }
}

/**
 * If no data in dto
 * throw Record Exist Error
 * */
function _failIfDtoDoesNotContainData( dto ) {
    if ( dto?.success ) {
        return dto;
    } else {
        throwRecordExistError();
    }
}

/**
 * Given the object with key names checks that format of value is correct or thorws
 * appropriate error.
 *
 * @param obj
 * @returns {{}}
 * @private
 */
function _validateProperties( obj ) {
    let returnObj = {};

    for ( let [ key, value ] of Object.entries( obj || {} ) ) {

        switch ( key ) {
            case "first_name" :
            case "username" :
                validate.isCharactersString( value ) ?
                    returnObj[ key ] = value : null;
                break;
            case "password" :
            case "new_password" :
                validate.isPassword6To24CharacterLong( value ) && validate.isPasswordString( value ) ?
                    returnObj[ key ] = value : null;
                break;
            case "email" :
                validate.isEmailString( value ) ?
                    returnObj[ key ] = value : null;
                break;
            case "phone_number":
                validate.isPhoneNumber( value ) ?
                    returnObj[ key ] = value : null;
                break;
            case "token":
            case "email_confirm_token":
            case "verification_token":
                validate.isUrlSafeString( value ) ?
                    returnObj[ key ] = value : null;
                break;
        }
    }

    return returnObj;
}

// Make sure ( username or email ) and password exist.
function _isUserValidForCreation( user ) {
    let username = user.hasOwnProperty( "username" );
    let email = user.hasOwnProperty( "email" );
    let password = user.hasOwnProperty( "password" );

    return ( username || email ) && password;
}

/**
 * Validate properties
 * @param object
 * @param arrayOfPropertyNames
 * @returns {Promise<unknown>}
 * @private
 */
function _validateReceivedObjectProperties( object, arrayOfPropertyNames ) {
    // verifiedUser has some or all of the properties in the array.
    let extractedObject = _extractObjectWithProperties( object, arrayOfPropertyNames );

    // ValidatedUser has acceptable property values.
    let validatedObject = _validateProperties( extractedObject );

    // Create promise.
    return _createPromiseOfValidatedUser( validatedObject );
}

// Create new object only with properties given in array.
function _extractObjectWithProperties( obj, arrayOfProperties ) {
    let returnObj = {};

    arrayOfProperties.forEach( nameOfProperty => {
        if ( obj?.[ nameOfProperty ] ) {
            returnObj[ nameOfProperty ] = obj?.[ nameOfProperty ];
        }
    } );

    return returnObj;
}

// Change to lowCase properties given in array.
function _changeObjectPropertiesToLowCase( obj, arrayOfProperties ) {
    let returnObj = {};

    arrayOfProperties.forEach( nameOfProperty => {
        if ( typeof obj?.[ nameOfProperty ] === 'string' ) {
            returnObj[ nameOfProperty ] = obj?.[ nameOfProperty ].toLowerCase();
        }
    } );

    return { ...obj, ...returnObj };
}

function _createPromiseOfValidatedUser( validatedUser ) {
    return new Promise( function ( resolve ) {

        resolve( validatedUser );

    } );
}

// Token to be sent to user for recovery
function createRandomUrlSafeToken( user ) {

    const randomStringOne = randomBytes( 256 ).toString( 'base64' );
    const randomStringTwo = randomBytes( 256 ).toString( 'base64' );
    return {
        ...user,
        token: stringUtilAuth.makeStringUrlSafe( randomStringOne ),
        verification_token: stringUtilAuth.makeStringUrlSafe( randomStringTwo )
    }
}

function createPromiseOfValidatedObjects( validatedUser ) {
    return new Promise( function ( resolve, reject ) {

        if ( validatedUser ) {
            resolve( validatedUser );

        } else {
            // Throw error, to be handled in app error handler.
            throwValidationFailureError();
            reject( null );
        }

    } );
}

function createSendObject( dto ) {

    return dto?.data?.map( user => {
        return _extractObjectWithProperties( user, [
            "user_id",
            "slug",
            "first_name",
            "updated_at"
        ] );
    } );
}

/*********************
 * Private functions *
 *********************/

function _isUsernameAnEmail( user ) {

    return validate.isEmailString( user?.username );

}

function _correctPropertyName( user ) {

    if ( _isUsernameAnEmail( user ) ) {

        user = {
            email: user.username,
            password: user.password
        };

    }
    return user;
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


module.exports = {
    createPromiseOfValidatedObjects,
    createRandomUrlSafeToken,
    throwRecordExistError,
    createUsersSendObject: createSendObject,
    checkSuccess: _checkSuccess,
    validateProperties: _validateProperties,
    isUserValidForCreation: _isUserValidForCreation,
    failIfNewUserNotCreated: _failIfDtoDoesNotContainData,
    extractObjectWithProperties: _extractObjectWithProperties,
    createPromiseOfValidatedUser: _createPromiseOfValidatedUser,
    changeObjectPropertiesToLowCase: _changeObjectPropertiesToLowCase,
    _verifyObjectProperties,
    _validateProperties,
    validateReceivedObjectProperties: _validateReceivedObjectProperties
};
