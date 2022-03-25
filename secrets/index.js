const keys = require( './keys' );
const email = require( './email' );
const db = require( './db' );

module.exports = {
    ...keys,
    ...email,
    ...db
};
