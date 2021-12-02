'use strict';
/**
 * These are application level error handlers. All error responses should be send using these functions.
 * These should be use in app.js file, not in controller files.
 * @type {{notFound404: notFound404, appError500: appError500, appError400: appError400}}
 */
module.exports = {
    notFound404,
    appError400,
    appError500,
    validationError
}


function notFound404( req, res, next ) {
    res.status( 404 );
    res.send( {
        code: 404,
        type: "not found",
        error: "not found location main app"
    } )
}

function appError400( req, res, next ) {
    res.status( 400 );
    res.send( {
        code: 400,
        type: "data error",
        error: "data format error"
    } )
}

function validationError( err, req, res, next ) {
    if ( err.message === "Validation_Failure" ) {
        res.status( 200 );
        res.send( {
            code: 200,
            type: "validation error",
            error: "validation failed"
        } )
    } else {
        next( err );
    }
}

function appError500( err, req, res, next ) {
    res.status( 500 );
    res.send( {
        code: 500,
        type: "app error",
        error: "something serious happened"
    } )
}
