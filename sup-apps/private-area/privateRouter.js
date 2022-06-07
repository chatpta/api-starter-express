'use strict';
const express = require( 'express' );
const router = express.Router();
const jwtRead = require( '@chatpta/jwt-read' );
const controller = require( './privateController' );
const error = require( "@chatpta/common-util" ).error;
const { secretConfig } = require( "../../config" );


/********************************************
 * All routes below this level are private. *
 ********************************************/
/**
 * Code on line 18 verifies jwt and role.
 * Private admin paths only user with seller role allowed.
 * If presented json web token is not valid error response will be returned
 */
router.use( jwtRead.verifyJwtAndRole( jwtRead.adminRole(), secretConfig.getPublicKey(), error.throwUsedTokenError ) );

router.get( '/', controller.getRequestHandler );
router.post( '/', controller.postRequestHandler );
router.patch( '/', controller.patchRequestHandler );
router.delete( '/', controller.deleteRequestHandler );

module.exports = router;
