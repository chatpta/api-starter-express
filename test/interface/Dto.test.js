'use strict';
const { describe, it } = require( "mocha" );
const DtoProvider = require( '../../interfaces' );
const assert = require( "assert" );


describe( "Interface/Dto", async function () {

    it( "database query should get time", async function () {
        // Arrange
        let record = DtoProvider.getDTO();
        record.length = 3;
        record.success = true;
        record.data = { title: "happy" }

        // Assert
        assert.deepStrictEqual( record.length, 3 );
        assert.deepStrictEqual( record.success, true );
        assert.deepStrictEqual( record.data, { title: "happy" });
    } );
} );
