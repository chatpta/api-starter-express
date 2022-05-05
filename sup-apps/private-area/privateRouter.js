'use strict';
const express = require( 'express' );
const router = express.Router();
const jwtRead = require( '@chatpta/jwt-read' );
const controller = require( './privateController' );
const error = require( "@chatpta/common-util" ).error;
const { secretConfig } = require( "../../config" );

// Verify jwt and role here.
// Private admin paths only user with seller role allowed.
router.use( jwtRead.verifyJwtAndRole( "seller", secretConfig.getPublicKey(), error.throwUsedTokenError ) );
router.get( '/', controller.getRequestHandler );
router.post( '/', controller.postRequestHandler );
router.patch( '/', controller.patchRequestHandler );
router.delete( '/', controller.deleteRequestHandler );

module.exports = router;
