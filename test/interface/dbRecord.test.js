const { describe, it } = require( "mocha" );
const { DbRecord } = require( '../../factory' );
const assert = require( "assert" );

describe( "Database connection", async function () {

    it( "database query should get time", async function () {
        // Arrange
        let record = new DbRecord();
        record.length = 3;
        record.success = true;
        record.record = { title: "happy" }

        // Assert
        assert.deepStrictEqual( record.length, 3 );
        assert.deepStrictEqual( record.success, true );
    } );
} );
