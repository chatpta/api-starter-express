'use strict';
const express = require( 'express' );
const router = express.Router();
const jwtRead = require( '@chatpta/jwt-read' );
const controller = require( './privateController' );
const { publicKey } = require( "../../secrets" );
const { appErrorHandlers } = require( "../../errors" );


// Private admin paths only user with admin role allowed.
// Verify jwt and role here.
router.use( jwtRead.verifyJwtAndRole( "admin", publicKey, appErrorHandlers.throwUsedTokenError ) );
router.get( '/', controller.getRequestHandler );
router.post( '/', controller.postRequestHandler );
router.patch( '/', controller.patchRequestHandler );
router.delete( '/', controller.deleteRequestHandler );

module.exports = router;
