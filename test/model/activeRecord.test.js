'use strict';
const { describe, it } = require( "mocha" );
const ActiveRecord = require( '../../model/ActiveRecord/ActiveRecord' );
const assert = require( "assert" );

describe( "Active Record base class", () => {

    it( "Contains findById function", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.findById;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains save function", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.save;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains update function", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.update;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );

    it( "Contains delete function", done => {
        // Arrange
        const record = new ActiveRecord();

        // Act
        const typeOfProperty = typeof record.delete;

        // Assert
        assert( typeOfProperty === "function" );
        done();
    } );
} );
