const express = require( 'express' );
const router = express.Router();
const user = require( '../controller/usersController' );

/* GET users listing. */
router.get( '/', user.getRequestHandler );
module.exports = router;
