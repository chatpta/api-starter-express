'use strict';
const express = require( 'express' );
const router = express.Router();
const jwtRead = require( '@chatpta/jwt-read' );
const controller = require( './privateController' );
const { appErrorHandlers } = require( "../../errors" );
const { secretConfig } = require( "../../config" );

// Verify jwt and role here.
// Private admin paths only user with seller role allowed.
router.use( jwtRead.verifyJwtAndRole( "seller",
    process?.env?.PUBLIC_KEY || secretConfig.getPublicKey(), appErrorHandlers.throwUsedTokenError ) );
router.get( '/', controller.getRequestHandler );
router.post( '/', controller.postRequestHandler );
router.patch( '/', controller.patchRequestHandler );
router.delete( '/', controller.deleteRequestHandler );

module.exports = router;
