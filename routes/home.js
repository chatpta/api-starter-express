const express = require( 'express' );
const router = express.Router();
const home = require( '../controller/homeController' );

/* GET home page. */
router.get( '/', home.getRequestHandler );

module.exports = router;
