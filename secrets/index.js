const keys = require( './keys' );
const email = require( './email' );
const db = require( './db' );
const app = require( './app' );

module.exports = {
    ...keys,
    ...email,
    ...db,
    ...app,
};
