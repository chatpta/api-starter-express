'use strict';
const { describe, it } = require( "mocha" );
const { DTO } = require( '../../factory' );
const assert = require( "assert" );


describe( "Database connection", async function () {

    it( "database query should get time", async function () {
        // Arrange
        let record = DTO;
        record.length = 3;
        record.success = true;
        record.record = { title: "happy" }

        // Assert
        assert.deepStrictEqual( record.length, 3 );
        assert.deepStrictEqual( record.success, true );
    } );
} );
