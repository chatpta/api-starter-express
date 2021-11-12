const express = require( 'express' );
const router = express.Router();
const user = require( '../controller' ).user;

/* GET users listing. */
router.get( '/', user.getRequestHandler );
router.post( '/', user.postRequestHandler );
router.patch( '/', user.patchRequestHandler );
router.delete( '/', user.deleteRequestHandler );

module.exports = router;
