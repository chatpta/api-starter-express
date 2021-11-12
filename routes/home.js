const express = require( 'express' );
const router = express.Router();
const controller = require( '../controller' );

/* GET home page. */
router.get( '/', controller.home.getRequestHandler );
router.post( '/', controller.home.postRequestHandler );
router.patch( '/', controller.home.patchRequestHandler );
router.delete( '/', controller.home.deleteRequestHandler );

module.exports = router;
