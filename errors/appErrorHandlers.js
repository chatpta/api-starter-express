'use strict';
/**
 * These are application level error handlers. All error responses should be send using these functions.
 * These should be use in app.js file, not in controller files.
 */
module.exports = {
    notFound404,
    appErrorHandler,
    throwValidationFailureError,
    throwRecordExistError,
    throwWrongCredentialsError,
    throwLoginRequiredError,
    throwRecordNotFoundError,
    throwUpdateFailedError,
    throwTransactionFailedError,
    throwUsedTokenError
}


function notFound404( req, res, next ) {
    res.status( 404 );
    res.send( { error: "not found" } )
}

function appErrorHandler( err, req, res, next ) {
    switch ( err?.message ) {

        case "Used_Token":
        case "Validation_Failure":
        case "Wrong_Credentials":
            res.send( { error: "wrong credentials" } )
            break;

        case "Record_Exist":
            res.send( { error: "record exist" } )
            break;

        case "Record_NotFound":
            res.send( { error: "record not found" } )
            break;

        case "Update_Failed":
            res.send( { error: "update failed" } )
            break;

        case "Login_Required":
            res.send( { error: "login required" } )
            break;

        case "Transaction_Failed":
            res.send( { error: "transaction failed" } )
            break;

        default:
            res.status( 500 );
            res.send( { error: "application error" } )
    }
}


function throwValidationFailureError() {
    throw new Error( "Validation_Failure" );
}

function throwWrongCredentialsError() {
    throw new Error( "Wrong_Credentials" );
}

function throwRecordExistError() {
    throw new Error( "Record_Exist" );
}

function throwRecordNotFoundError() {
    throw new Error( "Record_NotFound" );
}

function throwLoginRequiredError() {
    throw new Error( "Login_Required" );
}

function throwUpdateFailedError() {
    throw new Error( "Update_Failed" );
}

function throwTransactionFailedError() {
    throw new Error( "Transaction_Failed" );
}

function throwUsedTokenError() {
    throw new Error( "Used_Token" );
}
