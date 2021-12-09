'use strict';
const express = require( 'express' );
const router = express.Router();
const jwtRead = require( '@chatpta/jwt-read' );
const controller = require( './privateController' );
const { publicKey } = require( "../../secrets" );
const { appErrorHandlers } = require( "../../errors" );


// Verify jwt and role here.
// Private admin paths only user with user role allowed.
router.use( jwtRead.verifyJwtAndRole( "user", publicKey, appErrorHandlers.throwUsedTokenError ) );
router.get( '/', controller.getRequestHandler );
router.post( '/', controller.postRequestHandler );
router.patch( '/', controller.patchRequestHandler );
router.delete( '/', controller.deleteRequestHandler );

module.exports = router;
