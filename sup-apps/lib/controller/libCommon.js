'use strict';


const validate = require( "@chatpta/validate" ).validate;
const { jwtUtilAuth, pwdUtilAuth, stringUtilAuth } = require( "@chatpta/auth-util" );
const { authConfig } = require( '../../../config' );
const {
    throwValidationFailureError,
    throwRecordExistError,
    throwWrongCredentialsError,
    throwRecordNotFoundError
} = require( "@chatpta/common-util" ).error;
const { randomBytes } = require( "crypto" );


async function _loginUser( dataBaseUser, receivedUser, hashKey ) {

    let receivedPwHash = await _createReceivedPasswordHash( dataBaseUser, receivedUser, hashKey );
    let storedPwHash = dataBaseUser?.hash;

    if ( _compareBothPasswordHash( storedPwHash, receivedPwHash ) ) {

        if ( dataBaseUser?.email_confirmed ) {
            return {
                first_name: dataBaseUser?.first_name,
                user_id: dataBaseUser?.user_id,
                roles: dataBaseUser?.roles
            };
        } else {
            return {
                first_name: dataBaseUser?.first_name,
                user_id: dataBaseUser?.user_id,
                roles: dataBaseUser?.roles,
                email_not_confirmed: true
            };
        }

    } else {

        throwWrongCredentialsError();

    }
}

function _createJwtAndResponseObject( user, privateKey ) {

    let jwtHeader = {
        alg: authConfig.jwtSignatureAlgorithm,
        typ: "JWT"
    };

    if ( user?.email_not_confirmed ) {

        return _emailNotConfirmedJwtAndObject( user, jwtHeader, privateKey );

    } else {

        return _emailConfirmedJwtAndObject( user, jwtHeader, privateKey );

    }
}

function _emailNotConfirmedJwtAndObject( user, jwtHeader, privateKey ) {

    const payloadInput = {
        iat: Date.now(),
        client_id: user?.user_id,
        roles: user?.roles || [],
        email_not_confirmed: true
    };

    return {
        jwt: jwtUtilAuth.createSignedJwtFromObject( jwtHeader, payloadInput, privateKey ),
        name: user?.first_name,
        email_not_confirmed: true,
        roles: user?.roles || [],
    };
}

function _emailConfirmedJwtAndObject( user, jwtHeader, privateKey ) {

    const payloadInput = {
        iat: Date.now(),
        client_id: user?.user_id,
        roles: user?.roles || []
    };

    return {
        jwt: jwtUtilAuth.createSignedJwtFromObject( jwtHeader, payloadInput, privateKey ),
        name: user?.first_name,
        roles: user?.roles || [],
    };
}

// Skips the route, if no data in dto,
function _checkSuccess( dto ) {
    if ( dto?.success ) {
        return dto;
    } else {
        throwRecordNotFoundError();
    }
}

// If database query has returned empty dto object.
// Throws error dto does not contain success.
// Error is handled in the app error handlers.
function _failIfDtoDoesNotContainData( dto ) {
    if ( dto?.success ) {
        return dto;
    } else {
        throwRecordExistError();
    }
}

// Validate each of the properties values are in correct format.
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

function _validateLoginCredentials( user ) {
    // verifiedUser has some or all of the properties in the array.
    let verifiedUser = _extractObjectWithProperties( user, [
        "password",
        "email"
    ] );

    // If username contains email, change property name to email.
    let correctedUser = _correctPropertyName( verifiedUser );

    // ValidatedUser has acceptable property values.
    let validatedUser = _validateProperties( correctedUser );

    // Change email and first name to low case
    let lowCaseUser = _changeObjectPropertiesToLowCase( validatedUser, [
        "email"
    ] );

    // Create promise.
    return _createPromiseOfValidatedUser( lowCaseUser );
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

        // Check is ( username or email ) and password exist.
        if ( _isUserValidForCreation( validatedUser ) ) {
            resolve( validatedUser );
        } else {

            // Throw error, to be handled in app error handler.
            throwValidationFailureError();

        }
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

// Token to be sent to user for recovery
function createEmailConfirmRandomUrlSafeToken( user ) {

    const randomString = randomBytes( 256 ).toString( 'base64' );
    return {
        ...user,
        email_confirm_token: stringUtilAuth.makeStringUrlSafe( randomString )
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

function createUsersSendObject( dto ) {

    return dto?.data?.map( user => {
        return _extractObjectWithProperties( user, [
            "user_id",
            "slug",
            "first_name",
            "username",
            "email",
            "email_confirmed",
            "roles",
            "active",
            "deleted",
            "last_login",
            "crated_at",
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

function _compareBothPasswordHash( storedHash, receivedPwHash ) {

    if ( receivedPwHash === storedHash ) {

        return receivedPwHash === storedHash;

    } else {

        throwWrongCredentialsError();
        return {};

    }
}

async function _createReceivedPasswordHash( dataBaseUser, receivedUser, hashKey ) {
    try {

        let validReceivedUser = await _validateLoginCredentials( receivedUser );

        return pwdUtilAuth.createPasswordHashBasedOnSavedAlgorithmSalt(
            validReceivedUser?.password,
            dataBaseUser?.hash,
            hashKey
        );

    } catch ( error ) {
        throwWrongCredentialsError();
        return {};
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


module.exports = {
    createPromiseOfValidatedObjects,
    createEmailConfirmRandomUrlSafeToken,
    createRandomUrlSafeToken,
    throwRecordExistError,
    createUsersSendObject,
    loginUser: _loginUser,
    createJwtAndResponseObject: _createJwtAndResponseObject,
    checkSuccess: _checkSuccess,
    validateProperties: _validateProperties,
    isUserValidForCreation: _isUserValidForCreation,
    validateLoginCredentials: _validateLoginCredentials,
    failIfNewUserNotCreated: _failIfDtoDoesNotContainData,
    extractObjectWithProperties: _extractObjectWithProperties,
    createPromiseOfValidatedUser: _createPromiseOfValidatedUser,
    changeObjectPropertiesToLowCase: _changeObjectPropertiesToLowCase,
    _verifyObjectProperties,
    _validateProperties,
};
